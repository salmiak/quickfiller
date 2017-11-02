## Get started

Install node.js - google it.
Install Grunt `npm install -g grunt-cli`

Run `npm install` to install dependencies

## Build

Run `grunt` to build

***Future***
*Run `grunt build` to build production verions*
*Run `grunt dev` to set up watch*

## Running extension

1. In the Chrome dropdown menu go to `More Tools > Extensions`
2. At the top of screen tick in "Developer mode"
3. Hit the `Load unpacked extension` and find the `build`-folder in this project.
4. Hit select - Done!

To reload the extension, hit `Reload` on the extensions page in Chrome.

## Colors
When the extension runs it changes the background color of the input fields.
* **Yellow** input field have be found by the extension
* **Pink** input fields where pre-populated with data from storage
* **Blue** input fields have saved new data (that you've entered) to the storage
