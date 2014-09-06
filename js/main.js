$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
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
						$('.skip').show();
						$('.loading').hide();
					}
		);
    }
    
    function showVideo() 
    {
    	var videoBaseSrc = $('.videoBackground').data('videoBaseSrc');
        BV.show([
                 { type: "video/mp4",  src: videoBaseSrc + ".mp4" },
                 { type: "video/webm", src: videoBaseSrc + ".webm" },
                 { type: "video/ogg",  src: videoBaseSrc + ".ogv" }
        ],
        { ambient:true });
    }

	function showLogin(){
			$('.contentForm').show();
	}

});