/*
  Module dependencies.
*/

var fs = require('fs');
var url = require('url');

module.exports = function(folder, options){

	var $digger = options.$digger;

	if(!fs.existsSync(folder)){
		throw new Error('cgi-gin error - ' + folder + ' does not exist');
	}

	var files = fs.readdirSync(folder);
	var _scripts = {};

	files.filter(function(file){
		return file.match(/\.js/) ? true : false;
	}).forEach(function(file){

		var filepath = folder + '/' + file;

		var stripped_name = file.replace(/\.js$/, '');

		var handler = require(filepath)(options);

		_scripts[file] = handler;
		_scripts[stripped_name] = handler;
	})

	return function scripts(req, res, next){
		
		var path = url.parse(req.url).pathname;
		var handler = _scripts[path.replace(/^\//, '')];
		if(handler){
			handler(req, res, next);
		}
		else{
			res.statusCode = 404;
			res.send('not found: ' + req.url);
		}
	}
}