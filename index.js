const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db.js');
const hbs = require('hbs');
const routes = require(`./routes/routes.js`);
// const MongoStore = require('connect-mongo')(session);

// import module `express-session`
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express()
app.set(`view engine`, `hbs`);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static("views"));


app.use(session({
    secret: 'project-session',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://apdevUSER:easypassword@apdev-cluster.cpgyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
}))


app.use(`/`, routes);
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));


dotenv.config();
port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME;

// This helper allows us to convert a date type object into a mm/dd/yyyy format
hbs.registerHelper("formatDate", function(param) {
	var date = new Date(param);
	var year = date.getUTCFullYear();
	var month = date.getUTCMonth() + 1;
	var day = date.getUTCDate();
	return month + "/" + day + "/" + year;
});

// This helper allows us to concatenate a field's value to a String
hbs.registerHelper("concat", function(param) {
	var string = param.split(" ");
	return "/images/" + string[0] + ".jpg"
});

/*
app.get('/', function (req, res) {
	fs.readFile('views/Reglog.html', function(err, data) {
		res.setHeader('Content-Type', 'text/html');
		if(err){
			res.status = 404;
			res.write('404 not found');
		} else {
			res.status = 200;
			res.write(data);
		}
		res.end();
	});
});

app.post('/register', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var bio = "";

	var person = {
		username: username,
		password: password,
		//profilepic: "/profilePics/"+username+".png", //Profile pic variable
		bio: bio
	}
	
	if(person.username != "" && person.password != "" )
	db.insertOne(`users`, person);
	res.send('You are now registered ' + username);
	}
	
	else
	res.send('Invalid username/password	');
});


var currUser; //Global variable for current user

app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	var person = {
		username: username,
		password: password,
		//profilepic: "/profilePics/"+username+".png" 
	}

	db.findOne('users', person, function(result) {
		if(result != null && 
			result.username == username &&
			result.password == password)
			{
			currUser = result; //Set current user as person
			res.redirect('/home');
			}
		else
			res.send('Invalid credentials');
	});
	
});


app.get('/home', function (req, res) {
	
	res.render('Home', currUser);
	
	
});*/

/*
app.get('/Account_Settings/:username', function(req, res){
	res.render('Accsett', currUser);
});


app.post('/Account_Settings/save', function(req,res){
	var username = currUser.username;
	var changeusername = req.body.updateuser;
	var password = req.body.updatepass;
	var password2 = req.body.confirmpass;
	var currpass = req.body.currentpass;
	var bio = req.body.bio;


	if(password != "" && password != password2 )
		res.send('Update Password and Confirm Password do not match');

	else if(currpass == "" || currUser.password != currpass)
		res.send('Incorrect Current Password');

	else
	{

		if(changeusername != '')
		{
			db.updateOne('users', {username: username}, { $set:{username: changeusername} });
			currUser.username = changeusername;
		}
		

		if(password != '')
		{
			db.updateOne('users', {username: username}, { $set:{password: password} });
			currUser.password = password;
		}
		

		if(bio != currUser.bio)
		{
			db.updateOne('users', {username: username}, { $set:{bio: bio} });
			currUser.bio = bio;
		}
		

		res.send('Successfully saved!');
	}	
		

});
*/



app.listen(port, hostname, function () {
	console.log('Server running at:');
	console.log('http://' + hostname + ':' + port);

})
