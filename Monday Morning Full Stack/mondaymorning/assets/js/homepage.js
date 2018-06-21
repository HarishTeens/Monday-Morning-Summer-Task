$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});




$(document).ready(function() {
	$('#fullpage').fullpage();		
	$(".details").hide();
	$('#after-vote').hide();
	
});


$(".article").mouseover(function(){
	var x=$(this).children()[1];	
	x.className="details active animated bounceInDown";
})


	$(".article").mouseout(function(){
		var x=$(this).children()[1];
		x.className="details active animated bounceOutUp";
	})

/*$(document).scroll(function(){
	var x=$(".beginning").hasClass("active");
	console.log(x);
	if(x){
		$(".aside").show();

	}
	else{
		$(".aside").hide();	
	}
})*/






$(".editors-pick> div:gt(0)").hide();
setInterval(animo,4000);

function animo (){
	$(".editors-pick>div:first")		
	.addClass("flipOutX");
	setTimeout(function(){
		$(".editors-pick>div:first")
		.removeClass("active flipInX flipOutX")
		.next()
		.addClass("active flipInX")
		.end()
		.appendTo(".editors-pick");
	},1000);
	
	
};


$('form.ajax').on('submit',function(){
	var that=$(this),
		method=that.attr('method'),
		url=that.attr('action'),
		data={};

	that.find('input[name=vote]').each(function(){
		var that=$(this);
			checked=that[0].checked;
			if(checked){
			var	value=that.val(),
			name=that.attr('name');			
			data[name]=value;			
		}
	});	
	$.ajax({
		url:url,
		type:'ajax',
		method:method,
		data:data,			   	
		success: function(response){
			console.log(response);
			$('#before-vote').fadeOut();
			$('#after-vote').fadeIn();
			
		}

	});
	return false;
});