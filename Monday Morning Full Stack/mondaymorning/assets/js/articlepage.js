$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});


$(document).ready(function() {	
	$(".reply-section>form").hide();
	$(".view-replies").show();
	$(".replies").hide();
	//se
	load_data();
	function on() {    
	    $('#overlay').fadeIn();
	}

	function off() {    
	    $('#overlay').fadeOut();
	}
	function load_data(query){		
		var search_form=$('#search');

		$.ajax({
			url:search_form.attr('action'),
			method:'post', 
			data:{query:query},
			success:function(response){
				$('#overlay-text').html(response);
			}
		})
	}
	$('#search-text').keyup(function(){
	if($(this).val()){		
		on();
		var search=$(this).val();
		if(search!=''){
			load_data(search);
		} else {
			load_data();
		}
		
		}
	else{
		off();		
	}	
});
	
});

$( "#reply-btn" ).click(function() {
  	var x=$(this).parent().children()[2];  	
  	$(x).slideToggle(); 	
});
$( "#view-replies" ).click(function() {
  	var x=$(this).parent().children()[4];  	
  	$(x).slideToggle(); 	  	
});

