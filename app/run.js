require([
    'dojo/ready', 'dojo/parser',

    'app/PodcastWidget'
], function(
    ready, parser
    ){
    ready(function(){
        parser.parse();
    });

});