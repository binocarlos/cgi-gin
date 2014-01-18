cgi-gin
=======

Connect middleware for a folder of javascript modules

## usage

Mount a whole folder of javascript modules onto '/scripts':

```js
var gin = require('../index');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.use('/scripts', gin('/my/folder/of/js/files', {
	my:'options'
}))
```

A single module (test1.js) in the folder:

```js
module.exports = function(options){

	// options are the same for each module

	return function(req, res, next){
		// module code here
	}
}
```

This script will be run on these urls:

 * /scripts/test1
 * /scripts/test1.js


## installation

```
$ npm install cgi-gin
```

## methods

### gin(folder, options)

return a connect middleware that loads all .js files in folder and passes options to the module expecting a middleware function back.

options are the same for each module

## license

MIT