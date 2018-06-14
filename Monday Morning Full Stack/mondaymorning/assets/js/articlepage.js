$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});


$(document).ready(function() {	
	$(".reply-section>form").hide();
	$(".view-replies").show();
	$(".replies").hide();
});

$( "#reply-btn" ).click(function() {
  	var x=$(this).parent().children()[2];  	
  	$(x).slideToggle(); 	
});
$( "#view-replies" ).click(function() {
  	var x=$(this).parent().children()[4];  	
  	$(x).slideToggle(); 	  	
});

