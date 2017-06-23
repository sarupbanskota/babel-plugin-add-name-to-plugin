# babel-plugin-add-name-to-plugin
Adds name to babel plugin if it doesn't have one already.

I have an explanation available here.




# Usage
Clone this repo, `npm install`, and run:

`$ codemod --require babel-register -o index='{"pluginName": "babel-plugin-syntax-async-functions"}' --plugin src/index.js test/unnamed_plugins/babel-plugin-syntax-async-functions.js`
