
const db = require('../models/db.js');

const profileController = {

	getProfile: function(req, res){
		var currUser = req.session.currUser;
		var username = req.params.username;
		var profileOwner;
		var lists;
		var isEmpty;
		var isMine;
		
		if(username == currUser.username)
			isMine = true;
		else
			isMine = false;
		
		db.findOne('users', {username: username}, function(result) {
			profileOwner = result;
		});
		
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
			
			
		});
		
		db.findMany('comments', {}, null, null,  function(commentResults) {
			comments = commentResults;
			
			db.findMany('likes', {}, null, null,  function(likeResults) {
				likes = likeResults;
				
				var activity = comments.concat(likes);
				// console.log("After concat: " + activity.length);
				
				// filter out reviews not made by current user
				activity = activity.filter(function (e) {
					return e.username == username;
				});
				// console.log("After filter: " + activity.length);
				
				// sort reviews according to most recent
				activity.sort(function(a, b) {
					var dateA = new Date(a.date), dateB = new Date(b.date);
					return dateB - dateA;
				});
				// console.log("After sort: " + activity.length);
				
				// show at most the two most recent reviews
				activity = activity.slice(0,2);
				// console.log("After slice: " + activity.length);
				
				// console.log(dates.length);
				
				/* 	This 'findOne' snippet retrieves the profile picture of the reviewer
					and stores it as a new property into the 'activity' objects
				 */
				 
				if (activity.length > 0){
					db.findOne('users', {username: username}, function(result) {
						var i;
						for(i=0; i<activity.length; i++){
							var temp = activity[i];
							temp["profilepic"] = result.profilepic;
							activity[i] = temp;
						}
						
						var send = {currUser, profileOwner, activity, lists, username, empty: isEmpty, isMine: isMine}
						res.render('Profile', send);
					});
				}
				else{
					var send = {currUser, profileOwner, activity, lists, username, empty: isEmpty, isMine: isMine}
					res.render('Profile', send);
				}
				
			});
		});
	}
}

module.exports = profileController;