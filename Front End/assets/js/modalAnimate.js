/*=========================================
 * modalanimations.js: Version 1.0
 * author: Suman Kunwar
 * website: http://www.humanassistai.com
 * email: sumn2u@gmail.com
 * Licensed MIT
=========================================*/

(function ($) {

    $.fn.modalAnimate = function(options) {
        var modal = $(this);
        
        //Defaults
        var settings = $.extend({
            modalTarget:'modal-container',
            effect:'unfolding',
            autoEffect:false,
            // Callbacks
            modalClose: function() {}
        }, options);

        var closeBt = $('#'+settings.modalTarget);

        if(settings.autoEffect === true){
            var effect = $(modal).attr('data-effect')
            closeBt.removeAttr('class').addClass(effect)
            $('body').addClass('modal-active')
        }else{
           modal.click(function(event) {
              event.preventDefault();
              var effect = $(modal).attr('data-effect')
              closeBt.removeAttr('class').addClass(effect)
              $('body').addClass('modal-active')
          });
        }



        closeBt.click(function(event) {
            event.preventDefault();
            $(this).addClass('out');
            $('body').removeClass('modal-active');

        });

        function modalClose () {
          $('#'+settings.modalTarget).addClass('out');
          $('body').removeClass('modal-active');//modal close
        }


    }; // End modalAnimate.js

}(jQuery));
