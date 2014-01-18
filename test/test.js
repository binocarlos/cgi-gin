var gin = require('../index');
var express = require('express');
var request = require('request');
var http = require('http');

describe('cgi-gin', function(){

	it('should be a function', function() {

		(typeof(gin)).should.equal('function');

	})

	it('should mount a folder and run a middleware', function(done) {

		this.timeout(2000);

		

		var app = express();
		var server = http.createServer(app);


		app.use(express.query());

		app.use('/scripts', gin(__dirname + '/cgi-gin', {
			apples:10
		}))


		server.listen(8080, function(){
			 request.get({
		    url:'http://127.0.0.1:8080/scripts/test1?string=hello'
		  }, function (e, r, body) {
		    if(e){
		      return done(e);
		    }
		    body.should.equal('10hello world');
		    done();
		  })
		})

	})

})
