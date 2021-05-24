$(document).ready(function () {
	
	
	//AJAX for comment pressing enter
	$('#commentbox').on('focus',function(x)
	{
    $(document).on('keypress',function(e) {
	
	var commentText = $('#commentbox').val();
	var username = $('#username').text();
	var listName = $('#listName').text();
	var listOwner = $('#listOwner').text();
	var ID;
    if(e.which == 13 && commentText != "") {
		
		//Add comment to the database
		$.get('/addComment', {text: commentText, username: username, commentOn: listName, listOwner: listOwner}, function (result) {
			
			ID = result._id;
            
        
	
	
	//Add comment to page and update async
	
	//Create elements to be added
	var mainList = document.createElement('LI');
	var profileLink = document.createElement('a');
	var profileImage = document.createElement('IMG');
	var heartButton = document.createElement('button');
	var buttonImage = document.createElement('img');
	var numLikes = document.createElement('p');
	var commentTextHTML = document.createElement('p');
	var isLiked = document.createElement('p');
	var commentID = document.createElement('p');
	var commentID2 = document.createElement('p');
	var deleteButton = document.createElement('button');
	
	
	//Generate profile link
	profileLink.href = "/profile/" + username;
	profileImage.src = $('#profilepic').text();
	profileImage.className += "avatar";
	
	profileLink.appendChild(profileImage);
	
	
	//Generate like button
	heartButton.className += "commentbuttons";
	
	buttonImage.src = "/images/heartempty.png";
	buttonImage.className += "heart";
	
	numLikes.innerHTML = "0";
	numLikes.className += "number";
	
	
	deleteButton.className += "delete";
	commentID2.id = "commentID2"
	commentID2.innerHTML = ID;
	commentID2.hidden = true;
	deleteButton.innerHTML += "X";
	deleteButton.appendChild(commentID2)
	
	deleteButton.onclick = function() {
		var ID = $(this).children('#commentID2').text();

		console.log(ID);
		
		$(this).parent('li').remove();
		
			$.get('/deleteComment', {ID: ID}, function (result) {
				
        	});
	}
	
	
	isLiked.hidden = true;
	commentID.hidden = true;
	isLiked.innerHTML = "notLiked";
	commentID.innerHTML = ID;
	isLiked.id = "isLiked"
	commentID.id = "commentID"
	
	heartButton.appendChild(isLiked);
	heartButton.appendChild(commentID);
	
	
	heartButton.appendChild(buttonImage);
	heartButton.appendChild(numLikes);
	
	
	
	//Create comment element
	commentTextHTML.innerHTML = commentText;
	commentTextHTML.className += "comment";
	
	//Append everything to list element
	mainList.className += "commentelements";
	
	mainList.appendChild(profileLink);
	mainList.appendChild(commentTextHTML);
	mainList.appendChild(deleteButton);
	mainList.appendChild(heartButton);
	
	//append to document
	$('#commentlist').append(mainList);
	$('#commentbox').val("");
	});
    }
});
});

//AJAX for like buttons

$('#commentlist').on('click', '.commentbuttons', function () {
		
		//Find refno of the buttons parent
		var isLiked = $(this).children('#isLiked').text();
		var commentID = $(this).children('#commentID').text();
		var username = $('#username').text();
		
		//if comment is not liked
		if(isLiked == "notLiked")
		{
			//add like to database
			$.get('/likeComment', {username: username, commentID: commentID}, function (result) {
 
        		});

			//change like image to filled heart
			$(this).children('img').attr("src","/images/heart.png");
			var numLikes = parseInt($(this).children('.number').text());
			numLikes++;
			$(this).children('.number').text(numLikes);
			$(this).children('#isLiked').text("Liked");
		}
		
		else
		if(isLiked == "Liked")
		{
			//add like to database
			$.get('/dislikeComment', {username: username, commentID: commentID}, function (result) {
 
        		});

			//change like image to filled heart
			$(this).children('img').attr("src","/images/heartempty.png");
			var numLikes = parseInt($(this).children('.number').text());
			numLikes--;
			$(this).children('.number').text(numLikes);
			$(this).children('#isLiked').text("notLiked");
		}
		
    });

//Game like function
$("#listlikes").on('click', function () {
	var username = $('#username').text();
	var isLiked = $('#isListLiked').text();
	var numLikes = parseInt($('#numLikes').text());
	var listName = $('#listName').text();
	var listOwner = $('#listOwner').text();
		
		console.log(isLiked);
		if(isLiked == "notLiked")
		{
			console.log("test");
			$.get('/likeList', {username: username, listName: listName, numLikes: numLikes, listOwner: listOwner}, function (result) {
			
			
        	});
			
			
			
			numLikes++;
			$('#listHeart').attr("src","/images/heart.png");
			$('#isListLiked').text("Liked");
			$('#numLikes').text(numLikes)
		}
		else
		if(isLiked == "Liked")
		{
			
			$.get('/dislikeList', {username: username, listName: listName, numLikes: numLikes, listOwner: listOwner}, function (result) {
			
			
        	});
			
			numLikes--;
			$('#listHeart').attr("src","/images/heartempty.png");
			$('#isListLiked').text("notLiked");
			$('#numLikes').text(numLikes)
		}
		
		
	});

$(".delete").on('click', function () {
var ID = $(this).children('#commentID2').text();

		console.log(ID);
		
		$(this).parent('li').remove();
		
			$.get('/deleteComment', {ID: ID}, function (result) {
				
        	});
	
});

$(window).on('load', function () {
		
		//Find refno of the buttons parent
		var buttons = $('.commentbuttons');
		var username = $('#username').text();
		
		var commentIDArr = [];
		//get commentIDs
		for(var ctr = 0; ctr < buttons.length; ctr++)
		{
			commentIDArr.push($(buttons[ctr]).children('#commentID').text())
		}
		
		//Check whether user has liked the comments or not
		$.get('/checkifLiked', {username: username, commentIDArr: commentIDArr}, function (result) {
			
			//Iterate over results
			for(var ctr = 0; ctr < result.length; ctr++)
			{
			
				for(var ctr2 = 0; ctr2 < buttons.length; ctr2++)
				{
				if(result[ctr].commentID == $(buttons[ctr2]).children('#commentID').text())
				{
					$(buttons[ctr2]).children('#isLiked').text("Liked");
					$(buttons[ctr2]).children('img').attr("src","/images/heart.png");
				}
				
				}
			}
			
			
        	});

		var listName = $('#listName').text();
		var listOwner = $('#listOwner').text();
		//Check whether current user has liked the list
		$.get('/checkifLikedList', {username: username, listName: listName, listOwner: listOwner}, function (result) {
			console.log(result);
			if(result)
			{
							$('#listHeart').attr("src","/images/heart.png");
							$('#isListLiked').text("Liked");
			}
			
			
        	});
		
		
		//Check which comments are made by current user
		for(var ctr3 = 0; ctr3 < buttons.length; ctr3++)
		{
			console.log(username);
			console.log($(buttons[ctr3]).children('#commentBy').text());	
			if(username == $(buttons[ctr3]).children('#commentBy').text())
			{
				
				$(buttons[ctr3]).parent('li').children('.delete').attr('hidden', false);
			}
		}
    });



});
