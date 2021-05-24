const db = require('../models/db.js');
var ObjectId = require('mongodb').ObjectID;

const editController = {

   deleteList: function (req, res) {
		var listname = req.query.listname;
		var username = req.query.username;
		
		var deleteThis = {
			name: listname,
			username: username,
		}
		
		db.deleteOne('lists', deleteThis);
		db.deleteMany('gamesOnLists', deleteThis);
	},
	
	
	 addGame: function (req, res) {
		var listname = req.query.listname;
		var username = req.query.username;
		var game = req.query.game;
		var gameResult;
		
		db.findOne('games', {name: game}, function(result) {
		gameResult = result;
		
				
		if(gameResult != null)
		{
			var add = {
				list: listname,
				name: gameResult.name,
				url: gameResult.url,
				thumbnail: gameResult.cover,
				username: username
			}
			
			db.insertOne('gamesOnLists', add);
			res.send(gameResult);
		}
		
		else
		{
			res.send(false);
		}
		
		});
	
	},
	
	 updateListName: function (req, res) {
		var listname = req.query.listname;
		var username = req.query.username;
		var newListName = req.query.newListName;
		var newDescription = req.query.newDescription;
		
		
		var url = "/GameList/" + username + "/" + newListName;
		var newurl = url.replace(/\s/g, '%20');
		
		
		if(newListName.length != 0 && newDescription.length != 0)
		{
		db.updateOne('lists', {name: listname, username: username}, 
				{
					$set: {
						name: newListName,
						url: newurl,
						description: newDescription,
					}
				});
		}
		
		else
		if(newListName.length != 0)
		{
			db.updateOne('lists', {name: listname, username: username}, 
				{
					$set: {
						name: newListName,
						url: newurl,
						
					}
				});
		}
		else
		if(newDescription.length != 0)
		{
			db.updateOne('lists', {name: listname, username: username}, 
				{
					$set: {
						
						description: newDescription
					}
				});
		}
		
		
		
		
		if(newListName.length != 0)
		db.updateMany('gamesOnLists', {list: listname, username: username}, 
				{
					$set: {
						list: newListName,
					}
				});
	},
	
	 deleteGame: function (req, res) {
		var listname = req.query.listname;
		var username = req.query.username;
		var gameName = req.query.game;
		
		var deleteThis = {
			list: listname,
			name: gameName,
			username: username,
			
		}
		
		db.deleteOne('gamesOnLists', deleteThis);
	},
	
	createList: function (req, res) {
		var listname = req.query.listname;
		var username = req.query.username;
		var description = req.query.newDescription;
		var thumbnail = req.query.thumbnail;
		
		var url = "/GameList/" + username + "/" + listname;
		var addurl = url.replace(/\s/g, '%20');
		
		var addThis = {
			name: listname,
			username: username,
			description: description,
			thumbnail: thumbnail,
			url: addurl,
			likes: 0,
			
		}
		
		db.insertOne('lists', addThis);
	},
	
	updateThumbnail: function (req, res) {
		var listname = req.query.listname;
		var username = req.query.username;
		var thumbnail = req.query.thumbnail;
		
		
		db.updateOne('lists', {name: listname, username: username}, 
				{
					$set: {
						thumbnail: thumbnail
					}
				});
	},
}

module.exports = editController;
