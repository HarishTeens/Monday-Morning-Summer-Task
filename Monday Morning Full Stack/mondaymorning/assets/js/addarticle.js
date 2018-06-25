$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});


$(document).ready(function(){
	$('.sub-category').hide();
	$('#category').change(function(){
		var that=$(this);

		if(that.val()=='Department'){
			$('.sub-category').slideUp();
			$('#excerpt').slideDown();
			$('#department').slideDown();
		} else if(that.val()=='Campus'){
			$('.sub-category').slideUp();
			$('#excerpt').slideDown();
			$('#campus').slideDown();
		} else if(that.val()=='Views'){
			$('.sub-category').slideUp();
			$('#excerpt').slideDown();
			$('#views').slideDown();
		} else if(that.val()=='Career'){
			$('.sub-category').slideUp();
			$('#excerpt').slideDown();
			$('#career').slideDown();
		} else if(that.val()=='Alumini'){
			$('.sub-category').slideUp();
			$('#excerpt').slideDown();
			$('#alumini').slideDown();
		} else if(that.val()=='DD & CWC'){
			$('.sub-category').slideUp();
			$('#excerpt').slideDown();
			$('#ddncwc').slideDown();
		} else if(that.val()=="Editor's Pick"){
			$('.sub-category').slideUp();
			$('#excerpt').slideUp();
		}


	});

});