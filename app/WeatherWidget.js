define([
    "dojo/_base/declare",
    "dijit/_WidgetBase", "dijit/_TemplatedMixin",

    "app/WeatherService",

    "dojo/text!app/templates/WeatherWidget.html"
], function(
     declare,
    _WidgetBase, _TemplatedMixin,
    WeatherService,

    template

    ){

    var API_KEY = "585087f8cf5f2004";

    return declare('app/WeatherWidget', [_WidgetBase, _TemplatedMixin], {

        templateString: template,
        service: null,

        postCreate: function() {
            this.inherited(arguments);
            this.service = new WeatherService(API_KEY);
        }

    });
});