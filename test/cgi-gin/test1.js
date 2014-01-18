module.exports = function(options){
	return function(req, res, next){
		res.send(options.apples + req.query.string + ' world')
	}
}