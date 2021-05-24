const express = require(`express`);
const db = require('../models/db.js');
const GameController = require(`../controllers/GameController.js`);
const RegLogController = require('../controllers/RegLogController.js');
const listController = require('../controllers/ListController.js');
const editController = require('../controllers/EditController.js');
const Controller = require('../controllers/Controller.js');
const SuccessController = require('../controllers/SuccessController.js');
const AccSettController = require('../controllers/AccSettController.js');
const BrowseController = require('../controllers/BrowseController.js');
const ProfileController = require('../controllers/ProfileController.js');
const validation = require('../helpers/validation.js');

const app = express();

app.get('/', Controller.getIndex);

app.get(`/addComment`, GameController.addComment);
app.get(`/likeComment`, GameController.likeComment);
app.get(`/dislikeComment`, GameController.dislikeComment);
app.get(`/checkifLiked`, GameController.checkifLiked);
app.get(`/checkifLikedGame`, GameController.checkifLikedGame);
app.get(`/likeGame`, GameController.likeGame);
app.get(`/dislikeGame`, GameController.dislikeGame);
app.get(`/addtoList`, GameController.addtoList);
app.get(`/deleteComment`, GameController.deleteComment);

app.get(`/likeList`, listController.likeList);
app.get(`/dislikeList`, listController.dislikeList);
app.get(`/checkifLikedList`, listController.checkifLikedList);


app.get(`/deleteList`, editController.deleteList);
app.get(`/addGame`, editController.addGame);
app.get(`/updateListName`, editController.updateListName);
app.get(`/deleteGame`, editController.deleteGame);
app.get(`/createList`, editController.createList);
app.get(`/updateThumbnail`, editController.updateThumbnail);

app.get('/checkUsername', RegLogController.checkUsername);
app.get('/register', RegLogController.getRegister);
app.post('/register', validation.registerValidation(), RegLogController.postRegister);
app.get('/login', RegLogController.getLogin);
app.post('/login', RegLogController.postLogin);
app.get('/loginPage', RegLogController.loginPage);

app.get('/home', SuccessController.getHome);
app.post('/home', SuccessController.getHome);

app.get('/account_settings', AccSettController.getAccSett);
app.get('/updateUsername', AccSettController.updateUsername);
app.get('/updatePassword', AccSettController.updatePassword);
app.get('/updateBio', AccSettController.updateBio);
app.get('/updateProfilepic', AccSettController.updateProfpic);
app.get('/delete', AccSettController.deleteAccount);
app.get('/searchgame', AccSettController.searchGame);
app.get('/updateFavorites', AccSettController.updateFav);

app.get('/browse', BrowseController.getBrowse);
app.get('/profile/:username', ProfileController.getProfile);

app.get('/GameList/:username', Controller.getGameList);
app.get('/GameList/:username/:listName', Controller.getGameListList);
app.get('/GameList/:username/:listName/edit', Controller.getEdit);
app.get('/NewList/:username', Controller.getNewList);
app.get('/Game/:gameName', Controller.getGame);
app.get('/logout', Controller.getLogout);
	
	

	
	


module.exports = app;