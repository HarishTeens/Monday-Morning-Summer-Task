$(".modal").each(function(l){$(this).on("show.bs.modal",function(l){var o=$(this).attr("data-easein");"shake"==o?$(".modal-dialog").velocity("callout."+o):"pulse"==o?$(".modal-dialog").velocity("callout."+o):"tada"==o?$(".modal-dialog").velocity("callout."+o):"flash"==o?$(".modal-dialog").velocity("callout."+o):"bounce"==o?$(".modal-dialog").velocity("callout."+o):"swing"==o?$(".modal-dialog").velocity("callout."+o):$(".modal-dialog").velocity("transition."+o)})});

var content=false;
$(document).ready(function() { 

	$('.content').hide();
	$('.editform').hide();
	$('.editmsg').hide();
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


$( ".main" ).click(function() {
  	var x=$(this).parent().children()[1],
  		y=$(this).parent().children()[4];

  	$(x).slideToggle();
  	$(y).toggle();


  
});

$('.dbclick').dblclick(function(){
	var that=$(this);
	
	var x=$(this).parent().children()[2];	
	$('.editform').hide();
	$('.dbclick').show();
	that.hide();
	$(x).show();
	

});


$('.editform').keyup(function(e){
	if(e.keyCode==27){
		$('.editform').hide();
		$('.dbclick').show();

	}
		
})

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
		method:method,
		data:data,		
	   	dataType:"JSON",
		success: function(response){
			console.log(response);
		}


	})




	return false;
})



$('form.ajax2').on('submit',function(){
	var that=$(this),
		method=that.attr('method'),
		url=that.attr('action'),
		data={};
	that.find('textarea').each(function(){
		var that=$(this);
		name=that.attr('name');
		value=that.val();
		data[name]=value;
		
	});
	$.ajax({
		url:url,		
		method:method,
		data:data,			   	
		success: function(response){
			console.log(response);
			$('.editform').each(function(){
				var that=$(this);
				if(that.css('display')=='block'){
					var x=that.parent().children()[1];					
					x.innerHTML=response;
				}
			})
			$('.editform').hide();
			$('.dbclick').show();

		}


	});

	return false;
})