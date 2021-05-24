const db = require('../models/db.js');

const controller = {

	getIndex: function(req, res) {
		
		if(req.session.currUser != null)
		{
			var currUser = req.session.currUser;
			
			db.findMany('comments', {}, null, null,  function(commentResults) {
				var comments = commentResults;
				comments.sort(function(a, b) {
					var dateA = new Date(a.date), dateB = new Date(b.date);
					return dateB - dateA;
				});
				comments = comments.slice(0,5);
				
				/* 	This 'findOne' snippet retrieves the profile picture of the reviewer
					and stores it as a new property into the 'comment' objects within the
					'comments' array
				 
				
				var i;
				for(i=0; i<comments.length; i++){
					db.findOne('users', {username: comments[i].username}, function(result) {
						// console.log(result.profilepic);
						var temp = comments[i-1];
						temp["profilepic"] = result.profilepic;
						comments[i-1] = temp;
						
						var send = {comments, currUser};
						res.render('Home', send);
					});
				}*/
				var send = {comments, currUser};
				res.render('Home', send);
			});
		}
		
		else
		res.render('Reglog');
	},
	
	getGameList: function(req, res) {
		var username = req.params.username;
		var lists;
		var isEmpty;
		var isMine;
	
		var currUser = req.session.currUser;
	
	
	if(username == currUser.username)
	isMine = true;
	
	else
	isMine = false;
	
	
	db.findMany('lists', {username: username}, null, null, function(result) { 
		if(result.length != 0)
		{
		
		lists = result;
		isEmpty = false;
		}
		else
		{
		isEmpty = true;
		}
		
		
			var send = {currUser, lists, username, empty: isEmpty, isMine: isMine}
			res.render('UserList', send);
	});
	},
	
	
	getGameListList: function(req, res) {
		var listName = req.params.listName;
	var username = req.params.username;
	var list;
	var comments = [];
	var games = [];
	
	var currUser = req.session.currUser;
	
	var isMine;
	
	
	
	if(username == currUser.username)
	isMine = true;
	
	else
	isMine = false;
	
	console.log(isMine);
	
	db.findMany('comments', {commentOn: listName}, null, null,  function(commentResults) { 
		if(commentResults != null)
			comments = commentResults;
			
			
			db.findOne('lists', {name: listName, username: username}, function(result) {
			list = result;
			
				db.findMany('gamesOnLists', {list: listName, username: username}, null, null,  function(gamesResults) { 
				games = gamesResults;
				var send = {currUser, list, comments, games, isMine: isMine};
				res.render('List', send);
				
			});
			
			
			
		});
	
	});
	
	},
	
	getEdit: function(req, res) {
		
	var listName = req.params.listName;
	var username = req.params.username;
	var list;
	var games = [];
	
	var currUser = req.session.currUser;
			
			
		db.findOne('lists', {name: listName, username: username}, function(result) {
		list = result;
		
			db.findMany('gamesOnLists', {list: listName, username: username}, null, null,  function(gamesResults) { 
			games = gamesResults;
			
			if(games.length == 0)
			isEmpty = true;
			
			else
			isEmpty = false;
			
			var send = {currUser, list, games};
			res.render('EditList', send);
			
		});
		
		
		
	});	
	
	},
	
	getNewList: function(req, res) {
		
	var list;
	var games = [];
	
	var currUser = req.session.currUser;		
		
			var send = {currUser, list, games};
			res.render('NewList', send);
	
	},
	
	
	
	getGame: function(req, res) {
		
	
	var gameName = req.params.gameName;
	var currUser = req.session.currUser;
	//var projection = 'year link cover description developer publisher platform genre';
	
	var game = {
		name: gameName,
		year: "null",
		link: "null",
		cover: "null",
		description: "null",
		developer: "null",
		publisher: "null",
		platform: "null",
		genre: "null",
		likes: "null"
	}
	
	var comments = {};
	
	
	db.findOne('games', {name: gameName}, function(result) { //Game list
			
		if(result != null)	
		{
			game.year = result.year;
			game.link = result.link;
			game.cover = result.cover;
			game.description = result.description;
			game.developer = result.developer;
			game.publisher = result.publisher;
			game.platform = result.platform;
			game.genre = result.genre;
			game.likes = result.likes;
		}
		
		db.findMany('comments', {commentOn: gameName}, null, null,  function(commentResults) { 
		if(commentResults != null)
			comments = commentResults;
			
			var send = {currUser, game, comments};
			res.render('Game', send);
			
		});
		
	});
	
	
	},
	
	getLogout: function (req, res) {

      
        req.session.destroy(function(err) {
            if(err) throw err;

            res.redirect('/');
        });

    }

}

module.exports = controller;