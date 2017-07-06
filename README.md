# babel-plugin-add-name-to-plugin
Adds name to babel plugin if it doesn't have one already.

I have an explanation available [here](https://sarupbanskota.com/programming/babel/2017/06/23/writing-a-babel-codemod-plugin.html).




# Usage
Clone this repo, `npm install`, and run:

`$ codemod --require babel-register -o index='{"pluginName": "babel-plugin-syntax-async-functions"}' --plugin src/index.js test/unnamed_plugins/babel-plugin-syntax-async-functions.js`
