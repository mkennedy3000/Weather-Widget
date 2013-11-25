define([
    "dojo/_base/declare", "dojo/_base/lang",
    "dijit/_WidgetBase", "dijit/_TemplatedMixin",
    "app/WeatherService",
    "dojo/text!app/templates/WeatherWidget.html",
    "dojox/fx",
    "dojo/on", "dojo/dom", "dojo/dom-construct", "dojo/dom-class", "dojo/dom-style","dojo/domReady!",

    /* These are the modules that are required by the template */
        "dijit/form/TextBox"
], function(
     declare, lang,
    _WidgetBase, _TemplatedMixin,
    WeatherService,
    template,
    fx,
    on, dom, domConstruct, domClass, domStyle
    
    ){

    var API_KEY = "bf7ff2d8aa835e17";

    return declare('app/WeatherWidget', [_WidgetBase, _TemplatedMixin], {

        templateString: template,

        /**
         * The TextBox that takes in the location of interest
         */
        locationInput:null,
        
        /**
         * The attachment for autocomplete elements
         */
        containerNode:null,
        
        	//Array of autocomplete suggestion DOM nodes 
        	list:{},
        	//Value of current "selected" autocomplete suggestion
			autoSelected:{sel:0},
        
        /**
         * The wrapper for the weather data for the locationInput
         */
        weatherInfo:null,
        
        	weather:null,
        	pic:null,
        	temp:null,
        	high:null,
        	low:null,
        
        /**
         * The wrapper for the weather forecast data for the locationInput
         */
        weatherForecast:null,

		/**
		 * String indicating which weather view is shown
		 * Possible values: "info"|"forecast"
		 *   (More Views can be added)
		 */
		showing:"info",
		
		/**
		 * The weather service provided by www.wunderground.com
		 */
        service: null,

		/**
		 * WeatherWidget last minute setup
		 */
        postCreate: function() {
            this.inherited(arguments);
            
            //Get Wunderground weather service
            this.service = new WeatherService(API_KEY);
            
            //Connect Events
            this.connect(this.locationInput, "onfocus", "_onFocus");
            this.connect(this.locationInput, "onkeyup", "_onKeyUp");
            this.connect(this.weatherInfo, "onclick", "_toggleWeather");
            this.connect(this.weatherForecast, "onclick", "_toggleWeather");
            
            //Hide Info Nodes
            fx.wipeOut({node:this.weatherInfo, duration:0}).play();
            fx.wipeOut({node:this.weatherForecast, duration:0}).play();
        },
        
        /**
         * Clears locationInput value
         * Fades old weather info/forecast out of view
         *
         * @private
         */
        _onFocus: function() {
        	this.locationInput.value = "";
        	var wi;
        	if (this.showing === "info") 
        		wi = this.weatherInfo;
        	else
        		wi = this.weatherForecast;
    
        	var x = fx.fadeOut({node:wi});
        	var y = fx.wipeOut({node:wi, duration:0});
        	fx.chain([x,y]).play();
        },
        
        /**
         * Weather Widget Main Logic:
         *
         * Populates autocomplete container node with location suggestions when
         *    user types into the locationInput textbox
         * Highlights autocomplete suggestions with up and down arrow keys or mouse hovers
         * Selects and displays weather information based on autocomplete suggestion
         *    selected with a mouse click or enter press 
         *
         * @param {Object} Keyboard Event Object
    	 *
         * @private
         */
        _onKeyUp: function(e) {
        	/**
        	 *Create Variables of WeatherWiget Properties for access in
        	 *   _onKeyUp's internal functions
        	 */
        	var textBox = this.locationInput;
        	var text = this.locationInput.value;
        	var t = this.temp;
        	var h = this.high;
        	var l = this.low;
        	var auto = this.containerNode;
        	var acTemp = this.ac;
        	var weather = this.service;
        	var w = this.weather;
        	var p = this.pic;
        	var wi;
        	var list = this.list;
        	var autoSelected = this.autoSelected;
        	if (this.showing === "info") 
        		wi = this.weatherInfo;
        	else
        		wi = this.weatherForecast;
        	
        	/**
     	     * Populate autocomplete suggestions in WeatherWidget
     	     *
     	     * @param {Object} Auto completion search results
         	 *
   	      	 * @private
         	 */
        	function autoComp(results){
        		//Max number of autocomplete suggestions
        		var max = 5;
        		if(results.length < 3)
        			max = results.length;
        		domConstruct.empty("auto-complete");
        		for(var i = 0; i < max; i++)
        		{
        			//Create autocomplete suggestion
        			var element = domConstruct.create("div", {innerHTML:results[i].name, id:results[i].zmw},auto);
        			list[i] = element;
        			domClass.add(element, "autoElement");
        			on(element, "click", select);
        			on(element, "mouseover", function(){
        				for(var i = 0; i < max; i++)
        				{
        					if (list[i] == this)
        					{
        						domClass.replace(list[autoSelected.sel], "autoElement", "autoElementHighlight");
        						autoSelected.sel = i;
        						domClass.replace(list[autoSelected.sel], "autoElementHighlight", "autoElement");
        					}
        				}
        			});
        			fx.wipeIn({node:element}).play();
        		}
				//By default the first autocomplete result is selected
        		domClass.replace(list[0], "autoElementHighlight", "autoElement");
        		autoSelected.sel = 0;
        	};
        	
        	/**
       	     * Gets weather information for target in event and displays it
       	     *
       	     * @param {Object} Object with property "target" that is an autocomplete
       	     *                    DOM node.
             *
             * @private
             */
        	function select(event){
        		var location = event.target;
        		weather.getConditions("zmw:"+location.id).then(function(results){
            		var curTemp =results.temp_f;
            		t.innerHTML = curTemp + " &degF";
            		textBox.value = results.display_location.full;
            		p.src = results.icon_url;
            		domConstruct.empty("auto-complete");
            		w.innerHTML = results.weather;
            		var x = fx.wipeIn({node:wi, duration:0});
        			var y = fx.fadeIn({node:wi});
        			fx.chain([x,y]).play();
            	});
            	weather.getForecast("zmw:"+location.id).then(function(results){
            		var h_f = results.simpleforecast.forecastday[0].high.fahrenheit;
            		var l_f = results.simpleforecast.forecastday[0].low.fahrenheit;
            		h.innerHTML = "High: " + h_f + " &degF";
            		l.innerHTML = "Low: " + l_f + " &degF";
            		
            		//Forecast table
            		for (var x=0; x < 4; x++)
            		{
            			dom.byId("day"+x).innerHTML = results.simpleforecast.forecastday[x].date.weekday_short;
            			dom.byId("pic"+x).src = results.simpleforecast.forecastday[x].icon_url;
            			dom.byId("high"+x).innerHTML = results.simpleforecast.forecastday[x].high.fahrenheit+ " &degF";
            			dom.byId("low"+x).innerHTML = results.simpleforecast.forecastday[x].low.fahrenheit+ " &degF";
            		}
           		});
        	}

        	//Down Arrow Pressed
        	if(e.keyCode == 40){
        		if(autoSelected.sel < 4  && list[0] != null)
        		{
        			domClass.replace(list[autoSelected.sel], "autoElement", "autoElementHighlight");
        			autoSelected.sel++;
        			domClass.replace(list[autoSelected.sel], "autoElementHighlight", "autoElement");
        		}
        	}
        	//Up Arrow Pressed
        	else if(e.keyCode == 38){
        		if(autoSelected.sel > 0  && list[0] != null)
        		{
        			domClass.replace(list[autoSelected.sel], "autoElement", "autoElementHighlight");
        			autoSelected.sel--;
        			domClass.replace(list[autoSelected.sel], "autoElementHighlight", "autoElement");
        		}
        	}
        	//Enter Pressed
        	else if(e.keyCode == 13 && text !== ''){
        		var event = {};
        		event.target = list[autoSelected.sel];
        		select(event);
        		textBox.blur();
        	}
        	//If there is text in locationInput, populate autocomplete
        	else if(text !== ''){
        		this.service.queryCities(text).then(function(results){
            		autoComp(results);
            	});
        	}
        	//If there is no text, then empty autocomplete suggestions and hide old info
        	else{
        		if (dom.byId("auto-complete") != null)
        			domConstruct.empty("auto-complete");
        		fx.fadeOut({node:wi}).play();
        	}
        },	
        
        /**
         * Animates between the current weather info
         *    and the 4 day weather forecast
         *
         * TODO: If more views added, make an input parameter as 
         *       a string for view to transition to
         *
         * @private
         */
        _toggleWeather: function() {
        	var x,z;
        	if (this.showing === "info")
        	{
        		x = fx.wipeOut({node:this.weatherInfo});
        		z = fx.wipeIn({node:this.weatherForecast});
        		fx.chain([x,z]).play()
        		this.showing = "forecast";
        	}
        	else
        	{
        		x = fx.wipeOut({node:this.weatherForecast});
        		z = fx.wipeIn({node:this.weatherInfo});
        		fx.chain([x,z]).play()
        		this.showing = "info";
        	}
        },

    });
});