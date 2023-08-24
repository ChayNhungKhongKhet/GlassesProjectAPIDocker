


(function($) {
    "use strict";

    $('.search').on('click', function() {
        $('.search-box').toggleClass('open');
        return false;
    });
    
    $(window).on('scroll',function() {    
	   var scroll = $(window).scrollTop();
	   if (scroll < 265) {
		$(".sticky-header").removeClass("sticky");
	   }else{
		$(".sticky-header").addClass("sticky");
	   }
	});
    
	$('#mainSlider').nivoSlider({
        directionNav: false,
        controlNavThumbs: false,
        animSpeed: 2000,
        slices: 18,
        pauseTime: 5000,
        pauseOnHover: false,
        controlNav: true,
        manualAdvance: true,
        prevText: '<i class="fa fa-chevron-left nivo-prev-icon"></i>',
        nextText: '<i class="fa fa-chevron-right nivo-next-icon"></i>'
    });
    /*----------------------
		05. Isotope activation
	----------------------*/
    $(window).on('load',function(){

        // Activate isotope in container
        $(".isotope-gallery").isotope({
           itemSelector:'.gallery-item'
        });

        //add isotope click function
        $('.isotope-menu li').on('click',function(){
           $(".isotope-menu li").removeClass("active");
           $(this).addClass("active");

           var selector = $(this).attr("data-filter");
         $(".gallery-tab-content").isotope({
             filter: selector,
             animationOptions:{
                 duration:750,
                 easing:'linear',
                 queue: false
             }
         });
         return false;
        });

    });
    /*------------
        06. Carousel slider activation
    --------*/
   
   
    
    
    
  
  /*--------------------------
      08.  Counter Up
    ---------------------------- */	
    
    /*--------------------
      0.9 Accordion
    -------------------------*/
 
    /*--------------------------
        10. Elevatezoom 
    ---------------------------- */	
    $('#zoom1').elevateZoom({
        gallery:'gallery_01',
        responsive : true, 
        zoomType : "inner",
        galleryActiveClass: 'active', 
        imageCrossfade: true,
        easing : true,
        cursor: 'crosshair',
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 350
    });
    
    /*----------------------------
        11. price-slider active
    ------------------------------ */  
    $( '#slider-range' ).slider({
        range: true,
        min: -5,
        max: 310,
        values: [ 40, 250 ],
        slide: function( event, ui ) {
		$( '#amount' ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( '#amount' ).val( "$" + $( '#slider-range' ).slider( 'values', 0 ) +
	   " - $" + $( '#slider-range' ).slider( 'values', 1 ) ); 
	
    
  /*--------------------
       12. You tube video active
    -------------------------*/
   
    /*--------------------------
		13. Parallax active
	----------------------*/
	

   /*------------------
    	14. wow js active
    ---------------- */
    new WOW().init();
   /*------------
    	15. scrollUp jquery active
    ------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    /*---------
	   16. Preloader
	------------------------*/
		/*$(window).on('load', function() {
			$(".preloader").fadeOut("slow");;
		});*/
    
    /*----------------------------
      17.  Input Plus Minus Button
    ------------------------------ */ 
    

})(jQuery);

