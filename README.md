### Front End

At Vodori, we spend a lot of our time developing Front End widgets to help our clients' users display and interact with
our clients' data.

Often, this is done via a service or API provided by our client or a third party.

In this exercise, you will be creating a widget that allows users to get access to and view weather related data,
provided by the good people at [Weather Underground](http://www.wunderground.com/).

You'll be using the Dojo Toolkit. You may have not used it before; don't worry. If you're familiar with any
other frameworks or toolkits, you'll soon figure out how to do things the Dojo way. If you're not, now's the perfect time
to dive in!

#### The Task
Take the `WeatherService` service and use it to create a `WeatherWidget` widget. A completed widget should

 - Allow users to type in the name of a location
 - Display autosuggestions as users type in their location. Users should be able to select from this list.
 - Once a location has been entered into the textbox, the current weather conditions.
 - Now make it look nice. You can use CSS or, if you're so inclined, you can use LESS or SASS.
 - User's should be able to repeatedly put in different locations and see the widget change.
 - Once that's done, you can stop, if you like. However, the Weather Underground API has a lot to offer. If you're
   feeling adventurous, go ahead and extend the `WeatherService` service some more. Add another method corresponding
   to an API endpoint. Then, extend the `WeatherWidget` or create a new one and show us what you can do. This isn't
   mandatory, but if you really want to flex your UI engineering muscles, we'd love to see what you can do!

The skeleton code to start with is in a a Github repository. See below to see how to get set up with Git.
Get up to data on Dojo (see below).
Look at the code in the `app` directory. That's your starting place and where your code should go.

#### Dojo
You'll be working with version 1.9 of Dojo. Here's the first thing to know - it's *big*. Don't worry. You don't need
to know the whole of it to be able to use it. Start by going through the
[Introduction to AMD Modules](http://dojotoolkit.org/documentation/tutorials/1.9/modules/) tutorial. Next, look into
[Creating Template-based Widgets](http://dojotoolkit.org/documentation/tutorials/1.9/templated/). Finally, you'll want to
understand [Deferreds and Promises](http://dojotoolkit.org/documentation/tutorials/1.9/promises/).

This should give you a foundation to start building on. The [Dojo Docs](http://livedocs.dojotoolkit.org/) are the best
documentation you can find for Dojo, these days. The Toolkit is made up of

 - [Dojo](http://livedocs.dojotoolkit.org/dojo/index): The core packages.
 - [Dijit](http://livedocs.dojotoolkit.org/dijit/index): The packages associated with widgets. Widgets are, essentially
   HTML entities that users can interact with.
 - [Dojox](http://livedocs.dojotoolkit.org/dojox/index): A collection of packages that do all sorts of things (akin
   to the javax namespace in Java). You probably don't need to worry about these.


#### WeatherService
The `WeatherService` service is a front end module that provides a JavaScript interface to a web API.
First, take a look at the Weather Underground [API documentation](http://www.wunderground.com/weather/api/d/docs). The
current implementation of `WeatherService` provides methods implementing the Auto Suggestion API and the `getConditions`
method.

##### Getting the Wunderground.com API set up
Follow these steps to get set up with Wunderground

 1. Create an account at http://www.wunderground.com/weather/api/d/login.html
 2. Once your account is approved and you're logged in, generate an API key at http://www.wunderground.com/weather/api
    You'll need a Cumulus Developer + History account. It's free.
 3. When you instantiate the `WeatherService` (you can see this being done in the `WeatherWidget`), you pass it the
    API key that you just got.

#### Get set up with Git
If you've never used `git` before, don't worry. We're not testing your abilities with this tool. (That said, we
strongly recommend that you learn it. It's a create piece of source control management (SCM) software.)
If you don't already have it installed on your system, go to http://git-scm.com/downloads and select the
appropriate version of the software for your machine.

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

Then send the `tgz` file to us. We'll expand it, run the `git submodule` command to set up the dojo library, run a
web server in the root directory of what you send us and check out your widgets. Make sure you've added any new widgets
to `index.html` or create new pages to show off your new widgets!