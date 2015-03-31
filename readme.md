# STATICFRAME 0.1.0
> Structural framework for building static websites

## About it
This is a structural framework to get started with, which provide some best practices, library files, grunt task setups. This is based on Node and ruby(SASS engine). This framework is to create static/dynamic HTML files.

### Features
1. Provides setup for HTML projects
2. Some standard css(bootstrap, reset) javascript(jquery) library included.
3. Based on modular approach for javascript

### Dependencies
1. SASS - You need to have ruby and compass installed in your machine with global path setup

### Installation
Unpack the code in your favorite location. Preferably in projects folder. If you have node and sass already installed, then in your command line goto the project directory and run 

```shell
grunt server
```
Now you can access your server in the browser with http://localhost:3100 . The default port no is set as 3100, which you can alter in your site-config file.

#### Node
Download and install node in your system

#### SASS 
For SASS you need to install ruby. For the current setup we recomend using 1.9.1 
and for compiling SASS we are using compass which can be installed with the following command

```shell
gems install compass
```

Folder structure:

```shell
Application             : Keep all public api calls, json/XML files here.
builds
    |- build-<build-no> : Autometically generated on grunt command
node_modules            : Contains node modules. Ignore this.
public                  : All Javascript, CSS, images, content-images goes here
    |- css              : folder for generated CSS files
     |- min             : Minified css to be kept here
     |- modules         : Module based CSS
     |- themes          : The theme for the website has to be included here
     - jshint-reporter.css : Default CSS file for JSHINT Report Generator (views/dev-jshint-report.html)
    |- js               : Javascript folder 
     |- libs         : Put all third party javascripts here( un minified)
     |- min          : Folder for minified js files
     - ns.jshint-reporter.js : JS file for JSHINT Report Generator (views/dev-jshint-report.html)
    |- content-images   : Images that are expected to be author contributable
    |- images           : All images that are either used in CSS or part of development
    |- font             : Any custom font
Resources               
    |- scss             : SASS/LESS files.
        |- components   : contains default styling and customized components
        |- global-partials : contains icons, CSS for constants and mixins
        |- libs         : contains CSS provided by bootstrap and staticframe. Any other CSS libraries used can be placed here. 
        |- modules      : CSS for different modules of the website. Sample Provided.
        |- themes       : The theme for the website has to be included here
    |- sprite-source    : sprite psd files
routes                  : Contains routing of pages. Edit it if required.
views                   : Put your html templates here.
    |-components        : Contains markup for components of website.
        |-global-components : Contains markup for global components of website.
site-config.js          : Edit the site related global parameters
config.rb               : SASS- compass configuration file
package.json            : node modules configuration
app.js                  : Node root file to start the server.

```

##	Library/Technology used
1. CSS grid framework               : Bootstrap 3.3.3
2. CSS preporocessor				: SCSS
3. SCSS watcher						: Compass
4. JS DOM manupulation				: jQuery
5. JS form validation				: jQuery validator


##	Helpful commands

1. To install new node module		: npm install
2. Run grunt task					: grunt
3. compile scss files				: compass watch
4. run the application server		: node app
5. validate user credentials        : sudo chown -R $(whoami) ~/.npm


##Guidelines
	
### Javascript
Change namespace names for your project in all js files. Currently it's read as "NameSpace".


##### Beter coding practices
1. Try to use "use strict" in your modules where ever possible.
2. Use jshint to validate your code. You can use the plugins in your notepad++ or sublime editors


#### Implementation of publish - subscribe pattern
For event decoupling we recommend publish - subscriber pattern. To publish a custom event, use the publish function. Sample code is as below.

```js
$.publish(NameSpace.events.RESIZE);
```

And to capture this event:
```js
$.subscribe(NameSpace.events.RESIZE, function(evt){
	//write your function body here
})
```

### CSS



### Grunt Automation
A grunt file is provided with basic set of automation work. Modify it according to your need.

The default setup provides the following functionality:

1. Default Actions :: Start Server and watch for modifications 

```shell
$grunt
```
2. Report :: Generate JSHINT Report and open dev-jshint-report.html 

```shell
$grunt report
```
3. Build :: Uglification of Javascript, css minification, jshint error reporting for your dev environment 

```shell
$grunt build
```
4. Minification :: Uglification of Javascript and  CSS minification only
```shell
$grunt dev-minify
```







