$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});



$(document).ready(function() {
	$('#flash').hide();
	//$(".details").hide();	
	$('#after-vote').hide();
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








function update_votes(data=0){
	if(data){
	var hola=$('.status-bar').find('div[data-index='+data+']'),
		votes=parseInt(hola.attr('data-vote'))+1;
		hola.attr('data-vote',votes);
		total_votes=parseInt(hola.attr('data-total-votes'))+1;
		$('.bar-info').attr('data-total-votes',total_votes);
		
	}
		
		
		
		
		
	$('.status-bar').find('div[data-index]').each(function(){
		var that=$(this),
			votes=that.attr('data-vote'),
			total_votes=that.attr('data-total-votes');
			var percentage=(votes*100/total_votes).toFixed();			
		that[0].textContent=percentage+"%";
		var x=that.parent().children()[0].style.width=percentage
			/*x.css('width',percentage+'%');*/;
		
	})	

}



$('form.ajax1').on('submit',function(){
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
	})
	$.ajax({
		url:url,
		type:'ajax',
		method:method,
		data:data,			   	
		success: function(response){
			
			update_votes(response);
			$('#before-vote').hide();
			$('#after-vote').fadeIn();
		}
	})
	return false;
})


$('form.ajax2').on('submit',function(){
	var that=$(this),
		method=that.attr('method'),
		url=that.attr('action'),
		data={};
	that.find('input').each(function(){
		var that=$(this),
			value=that.val(),
			name=that.attr('name');
		data[name]=value;


	});	
	$.ajax({
		url:url,
		type:'ajax',
		method:method,
		data:data,
		success: function(response){
			$('#flash').html(response).slideDown();

		}
	});
	return false;
});





