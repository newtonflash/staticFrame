# STATICFRAME 0.1.0
> Structural framework for building static websites

## About it
This is a structural framework to get started with, which provide some best practices, library files, grunt task setups. This is based on Node and ruby(SASS engine). This framework is to create static/dynamic HTML files.


Folder structure:

Application             : Keep all public api calls, json/XML files here.
.
Resources               
    |- scss             : SASS/LESS files.
    |- sprite-source    : sprite psd files



/** ==================================================================================
	LIBRARY/TECHNOLOGY USED
====================================================================================== */
1. CSS grid framework               : Bootstrap 3.3.3
2. CSS preporocessor				: SCSS
3. SCSS watcher						: Compass
4. JS DOM manupulation				: jQuery
5. JS form validation				: jQuery validator


/** ===================================================================================
	HELPFUL COMMANDS
====================================================================================== */
1. To install new node module		: npm install
2. Run grunt task					: grunt
3. compile scss files				: compass watch
4. run the application server		: node app