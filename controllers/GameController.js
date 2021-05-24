const db = require('../models/db.js');
var ObjectId = require('mongodb').ObjectID;

const gameController = {

    addComment: function (req, res) {

        //Get variables
        var username = req.query.username;
		var commentOn = req.query.commentOn;
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
		var searchID =  ObjectId(commentID);
		var likeCommentOn;
		
		
		//get current date
		var today = new Date();
		/*var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); 
		var yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;*/
		
		db.findOne('comments', {_id: searchID}, function(result) {
			likeCommentOn = result.commentOn;
			
			var like = {
			username: username,
			commentID: commentID,
			date: today,
			likeCommentOn: likeCommentOn,
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
		});
		
		//make like variable
		
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
	
	checkifLiked: function (req, res) {
		var lookup = 0;
		var commentIDArr = req.query.commentIDArr;
		var username = req.query.username;
		
		var likedArr = [];
		
		commentIDArr.forEach(function(comment)
		{
			
		
		db.findOne('likes', {username: username, commentID: comment}, function(result) { 
		if(result != null)
		likedArr.push(result);
		
			
		if(++lookup == commentIDArr.length)
		{
		res.send(likedArr);
		}
		});
		
		});
		
	},
	
	checkifLikedGame: function (req, res) {
		var gameName = req.query.gameName;
		var username = req.query.username;
		
		db.findOne('likes', {username: username, commentID: gameName}, function(result) { 
		res.send(result);
		});
		
	},
	
	likeGame: function (req, res) {
		var gameName = req.query.gameName;
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
			commentID: gameName,
			date: today
		}
		
		db.insertOne('likes', like);
		
		//Update likes on game
		db.updateOne('games', {name: gameName}, 
				{
					$set: {
						likes: numLikes
					}
				})
	},
	
	dislikeGame: function (req, res) {
		var gameName = req.query.gameName;
		var username = req.query.username;
		var numLikes = parseInt(req.query.numLikes);
		
		numLikes--;
		var like = {
			username: username,
			commentID: gameName
		}
		
		
		//Delete like on database
		db.deleteOne('likes', like);
		
		//Update likes on game
		db.updateOne('games', {name: gameName}, 
				{
					$set: {
						likes: numLikes
					}
				})
	},
	
	addtoList: function (req, res) {
		var gameName = req.query.gameName;
		var username = req.query.username;
		var listName = req.query.listName;
		var cover = req.query.cover;
		
		var url = "/Game/" + gameName;
		var addurl = url.replace(/\s/g, '%20');
		
		var add = {
			list: listName,
			name: gameName,
			url: addurl,
			thumbnail: cover,
			username: username
		}
		
		
		db.findOne('lists', {name: listName, username: username}, function(result) { 
		if(result == null)
		res.send(false);
		
		else
		{
			db.insertOne('gamesOnLists', add);
			res.send(true);
		}
		
		});
	},
	
	deleteComment: function (req, res) {
		var ID = req.query.ID;
		var obID = ObjectId(ID);
		
		
		
		//Delete like on database
		db.deleteOne('comments', {_id: obID});
		db.deleteMany('likes', {commentID: ID});
		
	},
}

module.exports = gameController;
