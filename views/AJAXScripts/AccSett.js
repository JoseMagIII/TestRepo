$(document).ready(function () {
	var fav1_URL ="";
	var fav2_URL ="";
	var fav3_URL ="";


	$('#default1').click(function (){
		var change = $('#default1').attr('src');

		$('#profpic').attr("src", change);
	});

	$('#default2').click(function (){
		var change = $('#default2').attr('src');

		$('#profpic').attr("src", change);
	});

	$('#default3').click(function (){
		var change = $('#default3').attr('src');

		$('#profpic').attr("src", change);
	});

	$('#default4').click(function (){
		var change = $('#default4').attr('src');

		$('#profpic').attr("src", change);
	});

	$('#default5').click(function (){
		var change = $('#default5').attr('src');

		$('#profpic').attr("src", change);
	});

	$('#save').click(function (){
		
			var updateuser = $('#updateuser').val();
			if(updateuser){
					
					var username2 = $('#updateuser').val();

				 	$.get('/updateUsername', {/*username1: username, */username2: username2 } );
				 	$('#uploadtext').text('Username: ' + username2);

				$('#updateuser'.val(''));
			}

			$.get('/updateBio', {bio: $('#bio').val()} );


			$.get('/updateProfilepic', {profilepic: $('#profpic').attr('src')} );
			var change = $('#profpic').attr('src');

			$('#profile_pic').attr("src", change);

			var fav1 = $('#fav1').attr('src');
			var fav2 = $('#fav2').attr('src');
			var fav3 = $('#fav3').attr('src');

			$.get('/updateFavorites', {fav1: fav1,fav2: fav2,fav3: fav3,fav1_URL: fav1_URL,fav2_URL: fav2_URL,fav3_URL: fav3_URL});

			$('#error1').text('');
			$('#favsearch').css("display", "none");


			$('#error').text('Successfully Saved!');

			var updatepass = $('#updatepass').val();

			if(updatepass)
			{
				
				var test = false;
				if($('#updatepass').val() != $('#confirmpass').val() )
					$('#error').text('Failed to save Password, Confirm Password do not match');
				else
					test = true;

				

				var flag = false;
				
				var password = $('#currentpass').val();
				var password1 = $('#updatepass').val();
				if(test)
				{
				$.get('/updatePassword', {password: password, password1: password1}, function(result){
					
				if(!result)
					$('#error').text('Failed to save Password, Incorrect Current Password');
				else
				{
					$('#error').text('Successfully Saved!');

					$('#updatepass').val('');
					$('#confirmpass').val('');
					$('#currentpass').val('');

				}


				});

				

				
				/*
				if(!flag)
					$('#error').text('Incorrect Current Password');
				else
					$('#error').text('');
					*/
				}


			}

			
				
		



		
		

		


	});
/*
	$('#del').click(function (){
		$.get('/delete');
	};
*/
	$('#updateuser').keyup(function () {


		
			var username = $('#updateuser').val();
	
			

			$.get('/checkUsername', {username: username}, function(result) {
				if(result.username == username) {
					$('#updateuser').css('background-color', 'red');
					$('#error').text('Username is already taken');
					$('#save').prop('disabled', true);
					}

				else{
					$('#updateuser').css('background-color', 'white');
					$('#error').text('');
					$('#save').prop('disabled', false);
					}

			
		
			})
		
	});

	$('#fav1').click(function (){
		$('#searchgame').text('Change Favorites 1');

		$('#favsearch').css("display","block");
	});

	$('#fav2').click(function (){
		$('#searchgame').text('Change Favorites 2');

		$('#favsearch').css("display","block");
	});

	$('#fav3').click(function (){
		$('#searchgame').text('Change Favorites 3');

		$('#favsearch').css("display","block");
	});

	$('#searchbtn').click(function (){
		var search = $('#bar').val();

		$.get('/searchgame', {game: search}, function(result) {

				if(result) {

						$('#error1').text(result.cover);
						var favchange = $('#searchgame').text();

						if(favchange == "Change Favorites 1")
						{
							$('#fav1').attr("src", result.cover);
							fav1_URL = result.url;
						}
						
						else if(favchange == "Change Favorites 2")
						{
							$('#fav2').attr("src", result.cover);
							fav2_URL = result.url;
						}
						else if(favchange == "Change Favorites 3")
						{
							$('#fav3').attr("src", result.cover);
							fav3_URL = result.url;
						}

						
						$('#favsearch').css("display", "none");
						$('#error1').text('');
					}

				else{
						$('#error1').text('Game not Found!');	
					}

			
		
			})


	});


})



