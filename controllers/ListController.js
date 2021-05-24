const db = require('../models/db.js');
var ObjectId = require('mongodb').ObjectID;

const listController = {

    addListComment: function (req, res) {

        //Get variables
        var username = req.query.username;
		var commentOn = req.query.commentOn;
		var listOwner = req.query.listOwner;
		var text = req.query.text;
		var profpic = req.query.profpic;
		var id = ObjectId();
		
		//get current date
		var today = new Date();
		/*var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;*/
		
       	//make comment object
		var comment = {
			_id: id,
			username: username,
			text: text,
			commentOn: commentOn,
			listOwner: listOwner,
			likes: 0,
			date: today, 
			profilepic: profpic
		}
       	
       db.insertOne(`comments`, comment);
		res.send(comment);
    },
	
	
	likeComment: function (req, res) {
		
		//get variables
		var commentID = req.query.commentID;
		var username = req.query.username;
		var likeOn = req.query.likeOn;
		
		//get current date
		var today = new Date();
		/*var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;*/
		
		//make like variable
		var like = {
			username: username,
			commentID: commentID,
			date: today,
			likeOn: likeOn,
			profilepic: ""
		}
		
		db.insertOne('likes', like);
		
		
		//Create object id variable
		var searchID = ObjectId(commentID);
		
		//Find comment then update
		db.findOne('comments', {_id: searchID}, function(result) { //Game list
		if(result)
		{
			var numLikes = parseInt(result.likes);
			numLikes++; //Add one to likes
			
			
			//Update comment likes
			db.updateOne('comments', {_id: searchID}, 
				{
					$set: {
						likes: numLikes
					}
				})
		}
		});
		
		res.send(true);
	},
	
	dislikeComment: function (req, res) {
		//get variables
		var commentID = req.query.commentID;
		var username = req.query.username;
		
		
		//make like variable
		var like = {
			username: username,
			commentID: commentID,
		}
		
		//Delete the like
		db.deleteOne('likes', like);
		
		
		//Create object id variable
		var searchID = ObjectId(commentID);
		
		//Find comment then update
		db.findOne('comments', {_id: searchID}, function(result) { //Game list
		if(result)
		{
			var numLikes = parseInt(result.likes);
			numLikes--; //-1 to likes
			
			
			//Update comment likes
			db.updateOne('comments', {_id: searchID}, 
				{
					$set: {
						likes: numLikes
					}
				})
		}
		});
		
		res.send(true);
	},
	
	
	likeList: function (req, res) {
		var listName = req.query.listName;
		var listOwner = req.query.listOwner;
		var username = req.query.username;
		var numLikes = parseInt(req.query.numLikes);
		
		numLikes++;
		//get current date
		var today = new Date();
		/*var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;*/
		
		//Insert like to database
		var like = {
			username: username,
			listOwner: listOwner,
			commentID: listName,
			date: today
		}
		
		db.insertOne('likes', like);
		
		//Update likes on game
		db.updateOne('lists', {name: listName, username: listOwner}, 
				{
					$set: {
						likes: numLikes
					}
				})
	},
	
	dislikeList: function (req, res) {
		var listName = req.query.listName;
		var listOwner = req.query.listOwner;
		var username = req.query.username;
		var numLikes = parseInt(req.query.numLikes);
		
		numLikes--;
		var like = {
			username: username,
			listOwner: listOwner,
			commentID: listName,
		}
		
		
		//Delete like on database
		db.deleteOne('likes', like);
		
		//Update likes on game
		db.updateOne('lists', {name: listName, username: listOwner}, 
				{
					$set: {
						likes: numLikes
					}
				})
	},
	
	checkifLikedList: function (req, res) {
		var listName = req.query.listName;
		var listOwner = req.query.listOwner;
		var username = req.query.username;
		
		db.findOne('likes', {username: username, commentID: listName, listOwner: listOwner}, function(result) { 
		res.send(result);
		});
		
	},
	
	
}

module.exports = listController;
