$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

	
$(document).ready(function() { 

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
	
   $('input[name=approved]').change(function(){
   		var that=$(this).parent();
   		/*console.log(that);*/
   		that.submit();
   });

  });

$('form.ajax').on('submit',function(){
	var that=$(this),
		method=that.attr('method'),
		url=that.attr('action'),
		data={};

	that.find('input[name=approved]').each(function(){
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
	   	dataType:"JSON",
		success: function(response){
			console.log(response);
		}


	})




	return false;
})

