$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});
var onn=false;
$(document).ready(function(){
	//se
	load_data();
	function on() {    
	    $('#overlay').fadeIn();
	    onn=true;
	}

	function off() {    
	    $('#overlay').fadeOut();
	    onn=false;
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
	

	for(var i=1;i<5;i++)
	{
		$("#part"+i).hide();
	}
	$('#fullpage').fullpage({
		onLeave: function(index, nextIndex, direction){
			var leavingSection = $(this);

			//after leaving section 2
			if(index == 2 && direction =='up'){
				for(var i=1;i<5;i++)
				{
					
					$("#part"+i).addClass("flipOutY").delay(1000).removeClass("flipInY");
				}
			}

			if(onn){
				var sections=$('.section');
			    for(var i=1;i<sections.length;i++)
			    {
			    	sections[i].hide();
			    }
			}
			
		},	
		afterLoad: function(anchorLink, index){
			var loadedSection = $(this);

			//using index
			if(index == 2){
				for(var i=1;i<5;i++)
				{
					$("#part"+i).addClass("active flipInY").removeClass("flipOutY");
				}
			}
			var sections=$('.section');
	    	if(onn)	{
	    		for(var i=1;i<sections.length;i++)
			    {
			    	sections[i].show();
			    }
				}	
	    	}
	});	
	$(".dropdown").hide();	
})
for (var i = 1; i <3; i++) {
	
		$("#part"+i+">.content").mouseover(function(){
			var x=$(this).children()[1];	
			x.className="dropdown animated active bounceInDown";
		})
		$("#part"+i+">.content").mouseout(function(){
			var x=$(this).children()[1];	
			x.className="dropdown animated active bounceOutUp";
		})	
	
}

