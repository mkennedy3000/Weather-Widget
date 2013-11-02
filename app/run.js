require([
    'dojo/ready', 'dojo/parser',

    'app/WeatherWidget'
], function(
    ready, parser
    ){
    ready(function(){
        parser.parse();
    });

});