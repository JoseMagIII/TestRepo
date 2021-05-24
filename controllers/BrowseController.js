
const db = require('../models/db.js');

const browseController = {

	getBrowse: function(req, res){
		var currUser = req.session.currUser;
		db.findMany('games', {}, null, null, function(result) { 
			var games = [];
			games = result;
			var send = {games, currUser};
			res.render('Browse', send);
		});
	}
}

module.exports = browseController;