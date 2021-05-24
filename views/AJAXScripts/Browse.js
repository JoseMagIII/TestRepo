// alert("Browse.js loaded!");

// JQUERY AJAX
$(document).ready(function () {
	
	// Allows filtering of games according to genres selectable from a dropdown menu
	$('#filtersdrop').change(function () {
		var test = $('#filtersdrop').val();
		// alert(test);
		
		if(test == "All"){
			$('.gameitem').show();
		}
		else if(test == "Action"){
			$('.gameitem').hide();
			$('#Action').show();
		}
		else if(test == "Adventure"){
			$('.gameitem').hide();
			$('#Adventure').show();
		}
		else if(test == "MMO"){
			$('.gameitem').hide();
			$('#MMO').show();
		}
		else if(test == "RPG"){
			$('.gameitem').hide();
			$('#RPG').show();
		}
		else if(test == "Strategy"){
			$('.gameitem').hide();
			$('#Strategy').show();
		}
	});
	
	// Allows searching for games from catalog through a search box
	$('#search').keyup(function () {
		var value = $(this).val().toLowerCase();
		// alert(value);
		$(".gameitem").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});