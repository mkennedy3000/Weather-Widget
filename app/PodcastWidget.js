require([
    "dojo/_base/declare",
    "dijit/_WidgetBase", "dijit/_TemplatedMixin",

    "dojo/text!app/templates/PodcastWidget.html"
], function(
     declare,
    _WidgetBase, _TemplatedMixin,

    template

    ){
    declare('app/PodcastWidget', [_WidgetBase, _TemplatedMixin], {

        templateString: template

    });
});