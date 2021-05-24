$(document).ready(function () {
	$('#btn').attr("action", '');
	$('#btn').attr("method", 'get');
	$('#create').attr("type", 'button');

	$('a#ref').remove();
	$('#login').text('Log-in');

	var flag = false;
	$('#signup').click(function () {
		$('#error').text('');
	});

	$('#login').click(function () {
		$('#error').text('');
		flag = true;
	});

	$('#username').keyup(function () {


		if($('#create').val() == "Create Account"){
			var username = $('#username').val();
	
			

			$.get('/checkUsername', {username: username}, function(result) {
				if(result.username == username) {
					$('#username').css('background-color', 'red');
					$('#error').text('Username is already taken');
					$('#create').prop('disabled', true);
					}

				else{
					$('#username').css('background-color', 'white');
					$('#error').text('');
					$('#create').prop('disabled', false);


				
			
					}

			
		
			})
		}
	});

	$('#create').click(function () {
		var username = $('#username').val();
		var password = $('#password').val();
		

		if(!username || !password)
		{
			$('#error').text('Please fill up the fields');
		}
		else
		{
			


			if($('#create').val() == "Create Account"){
				$.get('/register', {username: username,password: password}, function(result){

					if(result)
					{
						$('#error').text('Account Successfully Registered');
						$('#username').val('');
						$('#password').val('');
					}
				});
			}
			
			else{
				
				
				$.get('/login', {username: username,password: password}, function(result){
/*
					if(result != null && 
						result.username == username &&
						result.password == password)
						{
							
							$.get('/home', {username: username, password: password}, function(result){});
						}
					else*/
						if(!result)
						$('#error').text('Invalid Credentials');
						else
							{
								$('#btn').attr('action', '/home');
								$('#create').attr('type', 'submit');
								if(flag)
								{
									$('#create').trigger('click');
									flag = false;
								}

							}
				})
			}



		}
	})

})