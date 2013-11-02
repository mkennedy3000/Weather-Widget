define(
    [
        'lodash',
        'dojo/_base/declare', "dojo/_base/lang",
        "dojo/Deferred",

        'dojo/request/script'
    ],
    function(
        _,
        declare, lang,
        Deferred,
        script

        ){

        BASE_URL = "//api.wunderground.com/api/";

        return declare(null, {

            apiKey: "",

            constructor: function (apiKey) {
                if (_.isUndefined(apiKey)) {
                    throw "Need to provide an API Key to the WeatherService";
                }
                this.apiKey = apiKey;
            },

            /**
             * Sends a request to Wunderland.
             * See http://www.wunderground.com/weather/api/d/docs?d=data/index for information about
             * appropriate values for the input parameters.
             *
             *
             * @param {string|Array} features One or more features to request from Wunderland
             * @param {string} query The query to send to Wunderland.
             * @param {string|Object} [settings=""] A set of settings to provide to Wunderland to modify how the
             *                                   request is handled
             * @private
             */
            _sendRequest: function(features, query, settings) {
                if(_.isArray(features)) {
                    features = features.join("/");
                }
                if(_.isEmpty(features)) {
                    throw "Must provide features for a request to Wunderland";
                }

                if(! _.isEmpty(settings)) {
                    if (_.isObject(settings)) {
                        settings = _.reduce(settings, function (result, value, key) {
                            return result + "/" + key + ":" + value;
                        }, "")
                    }
                    else if (_.isString(settings)) {
                        if (settings.substr(-1) === "/") {
                            settings = settings.slice(0, -1);
                        }
                        if(settings.charAt(0) !== "/") {
                            settings = "/" + settings;
                        }
                    }
                    else {
                        throw "Unrecognized settings format";
                    }
                }
                else {
                    settings = "";
                }

                var response = new Deferred();

                script.get(BASE_URL + this.apiKey +
                    this._ensureValidSlashes(features) +
                    this._ensureValidSlashes(settings) + "/q" +
                    this._ensureValidSlashes(query) + ".json",
                    {
                        jsonp: "callback"
                    }
                ).then(
                    function(value){

                        if(value.response.error) {
                            response.reject(value.response.error);
                        }
                        else {
                            if(value.response.results) {
                                response.reject({
                                    type: "ambiguousLocation",
                                    locations: value.response.results
                                });
                            }
                            response.resolve(value);
                        }
                    },
                    lang.hitch(response, "reject")
                );

                return response.promise;
            },

            /**
             * Ensures that input path starts with a single forward slash and ends with no slash
             * @param {string} path String to be cleaned up
             * @returns {string} Cleaned up string
             * @private
             */
            _ensureValidSlashes: function(path) {
                if(!_.isString(path)) {
                    throw "_ensureValidSlashes only works on strings";
                }
                path = path.replace(/^(.*?)(\/+)$/, "$1");
                path = path.replace(/^(\/*)(.*)$/, "/$2");

                return path === "/" ? "" : path;
            },

            /**
             * Gets the current conditions for the provided location
             * See http://www.wunderground.com/weather/api/d/docs?d=data/index for format for defining a location
             * @param location The location to look into
             * @returns {Deferred}
             */
            getConditions: function(location) {
                var conditions = new Deferred();
                this._sendRequest('conditions', location).then(
                    function(response){
                        return conditions.resolve(response.current_observation);
                    },
                    lang.hitch(conditions, 'reject')
                );
                return conditions;
            }
        })

});