# STATICFRAME 0.1.0
> Structural framework for building static websites

## About it
This is a structural framework to get started with, which provide some best practices, library files, grunt task setups. This is based on Node and ruby(SASS engine). This framework is to create static/dynamic HTML files.


Folder structure:

```shell
Application             : Keep all public api calls, json/XML files here.
builds
    |- build-<build-no> : Autometically generated on grunt command
node_modules            : Contains node modules. Ignore this.
public                  : All Javascript, CSS, images, content-images goes here
    |- css              : folder for generated CSS files
        |- min          : Minified css to be kept here
    |- js               : Javascript folder 
        |- libs         : Put all third party javascripts here( un minified)
        |- min          : Folder for minified js files
    |- content-images   : Images that are expected to be author contributable
    |- images           : All images that are either used in CSS or part of development
    |- font             : Any custom font
Resources               
    |- scss             : SASS/LESS files.
    |- sprite-source    : sprite psd files
routes                  : Contains routing of pages. Edit it if required.
views                   : Put your html templates here.
    |- global-includes  : Contains html-header, footer, libary inclusion list.
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


##	HELPFUL COMMANDS

1. To install new node module		: npm install
2. Run grunt task					: grunt
3. compile scss files				: compass watch
4. run the application server		: node app


##Guidelines
	
### Javascript

### CSS