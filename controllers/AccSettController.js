
const db = require('../models/db.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


const accsettController = {



	getAccSett: function(req, res){
		/*user = {
			username: req.query.username,
			password: req.query.password,
			bio: req.query.bio,
			profilepic: req.query.profilepic,
			fav1: req.query.fav1,
			fav2: req.query.fav2,
			fav3: req.query.fav3
		}*/

		var currUser = req.session.currUser;
		

		res.render('Accsett', currUser);
	},

	updateBio: function(req, res){
		var currUser = req.session.currUser;
		var username = currUser.username;
		var bio = req.query.bio;

		

		currUser.bio = bio;

		req.session.currUser = currUser;

		db.updateOne('users', {username: username}, { $set:{bio: bio} });

		res.send(true);
	},

	updateUsername: function(req, res){
		
		var currUser = req.session.currUser;

		var currusername = currUser.username;
		var newusername = req.query.username2;

		

		currUser.username = newusername;

		req.session.currUser = currUser;
		
		db.updateOne('users', {username: currusername}, { $set:{username: newusername} });
		
		res.send(true);
	},

	updatePassword: function(req, res){

		var currUser = req.session.currUser;

		

		var username = currUser.username;
		var currpass = currUser.password;
		var password = req.query.password;
		var password1 = req.query.password1;

		

		bcrypt.compare(password, currpass, function(err,equal) {
			
			if(equal)
			{
				bcrypt.hash(password1, saltRounds, function(err, hash){

				currUser.password = hash;
				db.updateOne('users', {username: username}, { $set:{password: hash} });



		

				res.send(true);


				});
			}

			else{

				res.send(false);

			}
/*
				db.updateOne('users', {username: username}, { $set:{password: password1} });
				currUser.password = password1;

				req.session.currUser = currUser;

				res.send(true);*/
				

				});

	


		
		
		
	},

	updateProfpic: function(req, res){
		var currUser = req.session.currUser;
		var username = currUser.username;
		var profpic = req.query.profilepic;

		
		
		currUser.profilepic = profpic;

		req.session.currUser = currUser;

		db.updateOne('users', {username: username}, { $set:{profilepic: profpic} });

		res.send(true);
	},

	deleteAccount: function(req, res){
	
		var currUser = req.session.currUser;
		var username = currUser.username;

		db.deleteOne('users', {username: username});


		req.session.destroy(function(err) {
            if(err) throw err;

            res.redirect('/');
        });

	},

	searchGame: function (req, res) {
		var game = req.query.game;
		
		
		db.findOne('games', {name: game}, function(result) {
		
		
				
		if(result != null)
		{
			var send = {
			cover: result.cover,
			url: result.url
			};

			res.send(send);
		}
		
		else
		{
			res.send(false);
		}
		
		});
	
	},

	updateFav: function(req, res) {
		var currUser = req.session.currUser;
		var username = currUser.username;
		var fav1 = req.query.fav1;
		var fav2 = req.query.fav2;
		var fav3 = req.query.fav3;
		var fav1_URL = req.query.fav1_URL;
		var fav2_URL = req.query.fav2_URL;
		var fav3_URL = req.query.fav3_URL;


		
		
		currUser.fav1 = fav1;
		currUser.fav2 = fav2;
		currUser.fav3 = fav3;
		currUser.fav1_URL = fav1_URL;
		currUser.fav2_URL = fav2_URL;
		currUser.fav3_URL = fav3_URL;

		req.session.currUser = currUser;

		db.updateOne('users', {username: username}, { $set:{fav1: fav1} });
		db.updateOne('users', {username: username}, { $set:{fav1_URL: fav1_URL} });
		db.updateOne('users', {username: username}, { $set:{fav2: fav2} });
		db.updateOne('users', {username: username}, { $set:{fav2_URL: fav2_URL} });
		db.updateOne('users', {username: username}, { $set:{fav3: fav3} });
		db.updateOne('users', {username: username}, { $set:{fav3_URL: fav3_URL} });

		res.send(true);
	}
	
}

module.exports = accsettController;