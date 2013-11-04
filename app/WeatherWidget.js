define([
    "dojo/_base/declare",
    "dijit/_WidgetBase", "dijit/_TemplatedMixin",
    "app/WeatherService",
    "dojo/text!app/templates/WeatherWidget.html",

    /* These are the modules that are required by the template */
        "dijit/form/TextBox"
], function(
     declare,
    _WidgetBase, _TemplatedMixin,
    WeatherService,
    template

    ){

    var API_KEY = "585087f8cf5f2004";

    return declare('app/WeatherWidget', [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        /**
         * The TextBox that takes in the location of interest
         */
        locationInput:null,

        service: null,

        postCreate: function() {
            this.inherited(arguments);
            this.service = new WeatherService(API_KEY);
        }

    });
});