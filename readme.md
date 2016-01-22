# STATICFRAME 0.1.0
> Structural framework for building static websites

## About it
This is a structural framework to get started with, which provide some best practices, library files, grunt task setups. This is based on Node and ruby(SASS engine). This framework is to create static/dynamic HTML files.

### Features
1. Provides setup for HTML projects
2. Some standard css(bootstrap grid, reset) javascript(jquery) library included.
3. Based on modular approach for javascript

### Dependencies
1. SASS - You need to have ruby and compass installed in your machine with global path setup.
2. Use Ruby 1.9 for avoiding glitches in using compass.

### Installation
Unpack the code in your favorite location. Preferably in projects folder. If you have node and sass already installed, then in your command line goto the project directory and run :
```shell
npm install
```
```shell
gem install compass
```
```shell
grunt server
```
"grunt server" command will automatically open the browser and now you can access your server files in the browser with http://localhost:3100 . The default port no is set as 3100, which you can modify in your site-config file.

#### Node
Download and install node in your system

#### SASS 
For SASS you need to install ruby. For the current setup we recomend using 1.9.1 
and for compiling SASS we are using compass which can be installed with the following command

```shell
gem install compass
```

Folder structure:

```shell
builds                  : Autometically generated on grunt command
node_modules            : Contains node modules. Ignore this folder ( even in your editor preferences) 
public                  : All Javascript, CSS, images, content-images goes here
    |- css              : folder for generated CSS files
        |- min          : Minified css to be kept here
    |- js               : Javascript folder 
        |- libs         : Put all third party javascripts here( un minified)
        |- min          : Folder for minified js files
        |- components   : contains components
        |- modules      : Add your modules if you really need any page/story specific code
    |- content-images   : Images that are expected to be author contributable( if you are using any CMS)
    |- images           : All images that are either used in CSS or system images.
    |- font             : Any custom font
    |- services         : Put all json/xml/html files requested by ajax calls.
Resources               
    |- scss             : SASS/LESS files.
        |- components   : contains default styling and customized components
        |- global-partials : contains icons, CSS for constants and mixins
        |- libs         : contains CSS provided by bootstrap and staticframe. Any other CSS libraries used can be placed here. 
        |- modules      : CSS for different modules of the website. Sample Provided.
        |- themes       : The theme for the website has to be included here
    |- sprite-source    : sprite psd files
    |- ts               : If you are using typescript, add your code here in the same structure as that of js in public folder
core
    |- routes           : Contains routing of pages. Edit it if required.
views                   : Put your html templates here.
    |-components        : Contains markup for components of website.
        |-global-components : Contains markup for global components of website.
site-config.js          : Edit the site related global parameters
config.rb               : SASS- compass configuration file
package.json            : node modules configuration
app.js                  : Node root file to start the server.

```

##	Library/Technology used
1. CSS grid framework           	: Bootstrap 3.3.3
2. CSS preporocessor			    : SCSS
3. SCSS watcher				        : Compass
4. JS DOM manupulation			    : jQuery
5. JS form validation			    : jQuery validator

##	Helpful commands

1. To install new node module		: npm install
2. Run grunt task			        : grunt
3. compile scss files			    : compass watch
4. run the application server		: node app
5. validate user credentials    	: sudo chown -R $(whoami) ~/.npm


### Grunt Automation
A grunt file is provided with basic set of automation work. Modify it according to your need.

The default setup provides the following functionality:

Default Actions :: Start Server and watch for modifications 
```shell
$grunt
```

Start Server, watch for modifications and open localhost in default browser
```shell
$grunt server
```

Report :: Generate JSHINT Report and open dev-jshint-report.html 
```shell
$grunt report-js
```

Build :: Uglification of Javascript, css minification, jshint error reporting for your dev environment 
```shell
$grunt build
```

Minification :: Uglification of Javascript and  CSS minification only
```shell
$grunt minify
```







