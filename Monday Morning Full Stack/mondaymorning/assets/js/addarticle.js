$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

$(document).ready(function(){
	$('.category').hide();
	
	$('#tab').change(function(){
		var that=$(this);
		var tab=that.val();

		if(tab=='Department'){
			$('.category').slideUp();
			$('#excerpt').slideDown();
			$('#department').slideDown(function(){
				$(this).change(function(){
					$('.category').val($(this).val());
				})				
			});
			
		} else if(tab=='Campus'){
			$('.category').slideUp();
			$('#excerpt').slideDown();
			$('#campus').slideDown(function(){
				$(this).change(function(){
					$('.category').val($(this).val());
				})				
			});
			
		} else if(tab=='Views'){
			$('.category').slideUp();
			$('#excerpt').slideDown();
			$('#views').slideDown(function(){
				$(this).change(function(){
					$('.category').val($(this).val());
				})				
			});
			
		} else if(tab=='Career'){
			$('.category').slideUp();
			$('#excerpt').slideDown();
			$('#career').slideDown(function(){
				$(this).change(function(){
					$('.category').val($(this).val());
				})				
			});

		} else if(tab=='Alumini'){
			$('.category').slideUp();
			$('#excerpt').slideDown();
			$('#alumini').slideDown(function(){
				$(this).change(function(){
					$('.category').val($(this).val());
				})				
			});
		} else if(tab=='DD & CWC'){
			$('.category').slideUp();
			$('#excerpt').slideDown();
			$('#ddncwc').slideDown(function(){
				$(this).change(function(){
					$('.category').val($(this).val());
				})				
			});
		} 
	});
	
})