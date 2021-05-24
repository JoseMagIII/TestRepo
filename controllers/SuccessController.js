
const db = require('../models/db.js');

const successController = {

	/*
	getHome: function(req, res){


		var person = {
			username: req.query.username,
			password: req.query.password,
			bio: ''
		};

		
		res.render('Home' ,person);
		console.log(person.username);

	}*/

	getHome: function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		var comments = [];
		
		var currUser = req.session.currUser;
		
		
		// Eto dinagdag ko, kung may problem balik mo na lang yung luma -Casie
		db.findMany('comments', {}, null, null,  function(commentResults) {
			comments = commentResults;
			
			// sort reviews acc. to most recent date
			comments.sort(function(a, b) {
				var dateA = new Date(a.date), dateB = new Date(b.date);
				return dateB - dateA;
			});
			
			// limit to 5 most recent reviews displayed
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
	
	
	
		/* Eto lumang code mo Immac -Casie
		db.findOne('users', person, function(result) {
			res.render('Home', {user: result});
		});*/
	}
}

module.exports = successController;