const db = require('../models/db.js');
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { validationResult } = require('express-validator');



const reglogController = {

	checkUsername: function(req, res) {

		var username = req.query.username
		

		db.findOne('users', {username: username}, function(result) {
			res.send(result);
		});
	
	},

	getRegister: function(req, res){
		
		var username = req.query.username;
		var password = req.query.password;
		var bio = "";
		var profpic = "/profilePics/default1.png";
		var fav1 = "/images/favoritesinput.png";
		var fav1_URL = "";
		
	
		var fav2 = "/images/favoritesinput.png";
		var fav2_URL = "";
		var fav3 = "/images/favoritesinput.png";
		var fav3_URL = "";

		bcrypt.hash(password, saltRounds, function(err, hash){

			var person = {
			username: username,
			password: hash,
			bio: bio,
			profilepic: profpic,
			fav1: fav1,
			fav2: fav2,
			fav3: fav3,
			fav1_URL: fav1_URL,
			fav2_URL: fav2_URL,
			fav3_URL: fav3_URL
		}

		db.insertOne(`users`, person);

		res.send(true);

		});

	},

	

	postRegister: function(req, res){
		
		var errors = validationResult(req);

		if(!errors.isEmpty())
		{
			errors = errors.errors;

			console.log('are you here');

			var details = {};
			for(i=0;i<errors.length; i++)
				details[errors[i].param + 'Error'] = errors[i].msg;

			res.render('Reglog', details);
		}


		else{



		var username = req.body.username;

		db.findOne('users', {username: username}, function(result) {
			if(result)
				res.render('Reglog', {usernameError: 'Username is already taken'});
			else
			{
				var password = req.body.password;
				var bio = "";
				var profpic = "/profilePics/default1.png";
				var fav1 = "/images/favoritesinput.png";
				var fav1_URL = "";
		
	
				var fav2 = "/images/favoritesinput.png";
				var fav2_URL = "";
				var fav3 = "/images/favoritesinput.png";
				var fav3_URL = "";

				bcrypt.hash(password, saltRounds, function(err, hash){

				var person = {
					username: username,
					password: hash,
					bio: bio,
					profilepic: profpic,
					fav1: fav1,
					fav2: fav2,
					fav3: fav3,
					fav1_URL: fav1_URL,
					fav2_URL: fav2_URL,
					fav3_URL: fav3_URL
				}

				db.insertOne(`users`, person);

				res.render('Reglog', {usernameError: 'Account Successfully Registered'});

				});
			}
		});

		

		}

	},

	getLogin: function(req, res){
		var username = req.query.username;
		var password = req.query.password;
		
		
		
		

		db.findOne('users', {username: username}, function(result) {
			
			if(result != null && result.username == username)
			{
				
				bcrypt.compare(password, result.password, function(err,equal) {

					if(equal)
					{
						req.session.currUser = result;
						res.send(true);
					}
					else
						res.send(false);

				})
				
				
			}
			else
				res.send(false);
		});

	},

	loginPage: function(req, res){
		res.render('loginValidate');
	},

	postLogin: function(req, res){
		var username = req.body.username;
		var password = req.body.password;
		
		
		
		
		

		db.findOne('users', {username: username}, function(result) {
			
			if(result != null && result.username == username)
			{
				
				bcrypt.compare(password, result.password, function(err,equal) {

					if(equal)
					{
						req.session.currUser = result;
						res.redirect('/home');
					}
					else
						res.render('loginValidate', {usernameError: 'Invalid Credentials'});
				})
				
				
			}
			else
				res.render('loginValidate', {usernameError: 'Invalid Credentials'});
		});

	},
/*
	getHome: function(req, res){


		var person = {
			username: req.query.username,
			password: req.query.password,
			bio: ''
		}

		
		res.render('Home' ,person);

	},
*/

}

module.exports = reglogController;