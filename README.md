### Front End (UI) Engineers
At Vodori, we spend a lot of our time developing Front End widgets to help our clients' users display and interact with our clients' data.

Often, this is done via a service or API provided by our client or a third party.

In this exercise, you will be creating a widget that allows users to get access to and view weather related data, provided by the good people at [Weather Underground](http://www.wunderground.com/).

You'll be using the Dojo Toolkit. You may have not used it before; don't worry. If you're familiar with any other frameworks or toolkits, you'll soon figure out how to do things the Dojo way. If you're not, now's the perfect time to dive in!

#### The Task
Take the `WeatherService` service and use it to create a `WeatherWidget` widget. A completed widget should

 - Allow users to type in the name of a location
 - Display autosuggestions as users type in their location. Users should be able to select from this list.
 - Once a location has been entered into the textbox, the current weather conditions.
 - Now make it look nice. You can use CSS or, if you're so inclined, you can use LESS or SASS.
 - Users should be able to repeatedly put in different locations and see the widget change.
 - You're done!

The skeleton code to start with is in a a Github repository. See below to see how to get set up with Git.
Get up to date on Dojo (see below).
Look at the code in the `app` directory. That's your starting place and where your code should go.

#### Dojo
You'll be working with version 1.9 of Dojo.
Here's the first thing to know - it's *big*. Don't worry! You don't need to know the whole of it to be able to use it.
There are plenty of tutorials that you can look at. They are available on [the Dojo website]((http://dojotoolkit.org/documentation/tutorials).

However, nothing beats just diving in.

In terms of documentation, the [Dojo Docs](http://livedocs.dojotoolkit.org/) are the best source you can find for Dojo, these days. The Toolkit is made up of:

 - [Dojo](http://livedocs.dojotoolkit.org/dojo/index): The core packages.
 - [Dijit](http://livedocs.dojotoolkit.org/dijit/index): The packages associated with widgets. Widgets are, essentially HTML entities that users can interact with.
 - [Dojox](http://livedocs.dojotoolkit.org/dojox/index): A collection of packages that do all sorts of things (akin to the javax namespace in Java). You probably don't need to worry about these.

Drop in on the first two, at least, to get your bearings.

##### How do I...

######... view my work?
Just opening index.html in a browser won't work here. You need to be running an HTTP server. However, don't worry... you
don't need to set up and configure a whole Apache instance. There are lightweight solutions:

**Node**
If you have `node` and `npm` installed, you can install `http-server`

    npm install -g http-server

Then, execute `http-server` in the same directory as index.html and navigate to [http://localhost:8080](http://localhost:8080)

**Python**
If you have `python` installed, you can run:

    python -m SimpleHTTPServer 8080

or, if you're running Python 3:

    python -m http.server

As with `node`, run either of these in the same directory as index.html and navigate to [http://localhost:8080](http://localhost:8080)

######... use Dojo modules?
Dojo is a modular toolkit. It operates in a manner that is similar to many other programming languages. You may be familiar with `import` in Java and Python, `use` and `require` in Perl, `include` in C and its derivatives. In general, these are simply methods for pulling additional functionality in to the code that you're writing.

The pattern to follow is:

    define([ "foo", "bar", "baz"], function(foo, bar, baz) {
        var qux;

        return qux; // qux is the thing that you're defining
    });

Within the function you wrote, `foo`, `bar` and `baz` provide you with the modules that you requested in the first array that you passed to `define`.


######... handle events?
Dojo provides the [`dojo/on`](http://livedocs.dojotoolkit.org/dojo/on) module for connecting to events.

######... handle responses from the `WeatherService` module?
The `WeatherService` module returns something called a promise. You can read more about those in the Further Reading below, but all you really need to know is that a promise has a method called `then`. This takes a function as a parameter. This function will be called when the API call to Weather Underground has completed and will be passed the result of the API call:

        service.getConditions("IL/Chicago").then(function(results) {
          console.log(results);
        });

It can also take a second function that will be called if there is an error. If you don't provide this, the error will appear on the browser `console`.

######... access nodes in the DOM?
This depends. The generic answer is to use the [`dojo/query`](http://livedocs.dojotoolkit.org/dojo/query) module. This takes CSS selectors (much like jQuery does) and will select nodes that match the selector under the root node that you provide (or under the `document` by default). However, if you're trying to access nodes within a Widget that you're developing then the right thing to use are 'attach points'. You can learn more about that [here](http://livedocs.dojotoolkit.org/quickstart/writingWidgets)

######... get unstuck?
Ask questions! Send us an email and we'll give you pointers so that you don't get bogged down. If in doubt, don't forget... it's just JavaScript. If you can do it in JavaScript, you can do it in Dojo.


#### WeatherService
The `WeatherService` service is a front end module that provides a JavaScript interface to a web API. This is the JavaScript
module that you will make calls to in order to access the Weather Underground API.

First, take a look at the Weather Underground [API documentation](http://www.wunderground.com/weather/api/d/docs). The
current implementation of `WeatherService` provides methods implementing the Auto Suggestion API and the `getConditions` method.

These are the only things you will need to complete the task.

##### Getting the Wunderground.com API set up
Follow these steps to get set up with Wunderground

 1. Create an account at http://www.wunderground.com/weather/api/d/login.html
 2. Once your account is approved and you're logged in, generate an API key at http://www.wunderground.com/weather/api
    You'll need a Cumulus Developer + History account. It's free.
 3. When you instantiate the `WeatherService` (you can see this being done in the `WeatherWidget`), you pass it the API key that you just got.

 We looked through their [privacy statement](http://www.wunderground.com/members/tos.asp#privacy). We think it's reasonable, but if you're unwilling to sign up for an API Key, please let us know as soon as possible, so that we can work something out.

#### Get set up with Git
If you've never used `git` before, don't worry. We're not testing your abilities with this tool. (That said, we strongly recommend that you learn it. It's a common piece of source control management (SCM) software.)
If you don't already have it installed on your system, go to http://git-scm.com/downloads and select the appropriate version of the software for your machine.

Once it's installed, open up a terminal to your CLI prompt.

Change to a directory that you want to work from and then execute the following commands:

    git clone git@github.com:vodori/vodori-fe-assignment.git
    cd vodori-fe-assignment
    git submodule init
    git submodule update

At this point, your development environment, including necessary libraries will be in place.


#### Passing you results to us
When you're done and ready to pass your work to us, you'll need to do the following in the `vodori-fe-assignment` directory

    git add -A
    git commit -m "Vodori Application by <your name>"
    git archive --format=tar HEAD | gzip > <your.name>.tgz

Then send the `tgz` file to us. We'll expand it, run the `git submodule` command to set up the dojo library, run a web server in the root directory of what you send us and check out your widgets. Make sure you've added any new widgets to `index.html` or create new pages to show off your new widgets!

#### Suggested reading
None of this is vital, but here are a few good things to look at, within the context of this exercise:
Start by going through the [Introduction to AMD Modules](http://dojotoolkit.org/documentation/tutorials/1.9/modules/) tutorial.
Next, look into [Creating Template-based Widgets](http://dojotoolkit.org/documentation/tutorials/1.9/templated/).
Finally, you'll want to understand [Deferreds and Promises](http://dojotoolkit.org/documentation/tutorials/1.9/promises/).

#### Feeling adventurous?
Once you've done everything above, you can stop, if you like. However, the Weather Underground API has a lot to offer. If you're feeling adventurous, go ahead and extend the `WeatherService` service some more. Add another method corresponding to an API endpoint. Then, extend the `WeatherWidget` or create a new one and show us what you can do. This isn't mandatory, but if you really want to flex your UI engineering muscles, we'd love to see what you can do!