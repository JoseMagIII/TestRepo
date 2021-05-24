$(document).ready(function () {
	
	var numGames = parseInt($('#numGames').text());
	var isCreated = false;
	var thumbnail;
	
	var newListName;
	if(numGames == 0)
		{
			$('#placeholdertext').attr('hidden', false);
		}
	
	
	
	$("#addgamebutton").on('click', function () {
	var username = $('#username').text();
	var listname = newListName;
	
	if(isCreated == true)
	{
	
	var game = prompt("Please enter game name");

	if (game != null) {
	  
		
		$.get('/addGame', {username: username, listname: listname, game: game}, function (result) {
			
			console.log(result);
			
			if(result == false)
			alert("Game could not be found");
			
			
			else
			{
				//add result contents to page
				/*
				<div class="gameitem">
				<p hidden class = "gameName">{{name}}</p>
				<img src={{thumbnail}} alt="{{name}} Thumbnail" width="125" height="175">
				<button class = "delete">X</button>
				</div>
				*/
				
				var mainDiv = document.createElement('div');
				var gameName = document.createElement('p');
				var thumbnail = document.createElement('IMG');
				var deleteButton = document.createElement('button');
				
				
				
				gameName.innerHTML = result.name;
				gameName.hidden = true;
				gameName.className += "gameName";
				
				thumbnail.src = result.cover;
				thumbnail.alt = result.name + " Thumbnail";
				thumbnail.width = "125";
				thumbnail.height = "175";
				
				var updateThumbnail = result.cover;
				
				deleteButton.appendChild(gameName);
				deleteButton.innerHTML += "X";
				deleteButton.className += "delete";
				deleteButton.onclick = function () {
		
					//Find refno of the buttons parent
					var gameName = $(this).children('p').text();
					var gameItem = $(this).parent('div');
					var listname = newListName;
					var username = $('#username').text();
					
					console.log(gameItem);
					
					
					$.get('/deleteGame', {username: username, listname: listname, game: gameName}, function (result) {
								});
					
					$(this).parent('div').remove();
					numGames--;
					
					if(numGames == 0)
					{
						$('#placeholdertext').attr('hidden', false);
					}
			    }
				
				
				mainDiv.className += "gameitem";
				
				
				mainDiv.appendChild(thumbnail);
				mainDiv.appendChild(deleteButton);
				
				
				
				
				$('#content2body').append(mainDiv);
				numGames++;
				
				if(numGames > 0)
				{
					$('#placeholdertext').attr('hidden', true);
				}
				
				//update thumbnail to first game in list
				if(numGames == 1)
				{
					
					console.log(updateThumbnail);
					$.get('/updateThumbnail', {username: username, listname: listname, thumbnail: updateThumbnail}, function (result) {
								});
				}
				
			}
			
			});
			}
			
		
	}
	else
	alert("Please create the list first");
		
	});
	
	$("#savechangesbutton").on('click', function () {
			
			var NewlistName = $("#listname").val();
			var username = $('#username').text();
			var newDescription = $('#description').val();
			
			if(NewlistName.length == 0)
			{
				alert("Input list name");
			}
			
			else
			if(newDescription.length == 0)
			{
				alert("Input description");
			}
			else
			if(isCreated == true)
			{
				alert("list already created");
			}
			else
			{
				$.get('/createList', {username: username, listname: NewlistName, newDescription: newDescription, thumbnail: "/images/empty.png"}, function (result) {
					});
					
				alert("List successfully created");
				isCreated = true;
				newListName = NewlistName;
				$('#savechangesbutton').prop('disabled', true);
			}
		});
	
	

});
