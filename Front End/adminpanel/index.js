$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

$(document).ready(function(){

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
		}		
	});	
	$(".dropdown").hide();	
})
for (var i = 1; i <5; i++) {
	if(i!=3)
	{
		$("#part"+i+">.content").mouseover(function(){
			var x=$(this).children()[1];	
			x.className="dropdown animated active bounceInDown";
		})
		$("#part"+i+">.content").mouseout(function(){
			var x=$(this).children()[1];	
			x.className="dropdown animated active bounceOutUp";
		})	
	}	
}

