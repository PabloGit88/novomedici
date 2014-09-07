$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
	$('.vjs-error').hide();

   $('.skip  a').click( function()
		{ 
			showLogin();
		}
	);
	
	var BV,
        videoPlayer,
        isTouch = Modernizr.touch,
        $window = $(window);
    
    if (!isTouch) {
        // initialize BigVideo
        BV = new $.BigVideo({forceAutoplay:isTouch});
        BV.init();
        showVideo();
		BV.getPlayer().one('ended', showLogin);
				
		BV.getPlayer().on('play', function() {
						
					}
		);
    }
    
    function showVideo() 
    {
    	var videoBaseSrc = $('.videoBackground').data('videoBaseSrc');
		var types = [ ];
		
		if ( BrowserDetect.browser == 'Firefox' )
			types = [ { type: "video/webm", src: videoBaseSrc + ".webm" } ];
		else if (BrowserDetect.browser == 'Other' )
			types = [ { type: "video/mp4",  src: videoBaseSrc + ".mp4" } ];
			else 
				types = [ { type: "video/mp4",  src: videoBaseSrc + ".mp4" },{ type: "video/webm", src: videoBaseSrc + ".webm" },{ type: "video/ogg",  src: videoBaseSrc + ".ogv" } ];
		
		BV.show(types,{ ambient:true });
    }

	function showLogin(){
			$('.contentForm').show();
			BV.getPlayer().pause();
			BV.show('images/background.jpg');
			$('.skip').hide();
	}

});