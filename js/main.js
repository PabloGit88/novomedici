$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
	$('.vjs-error').hide();

	$('.skip  a').click(function(e)
	{ 
		e.preventDefault();
		showLogin();
	});
	
	var BV,
        videoPlayer,
        isTouch = Modernizr.touch,
        $window = $(window);
    
    BV = new $.BigVideo({forceAutoplay:isTouch});
    BV.init();
  
	BV.getPlayer().on('progress ', function() {
		var howMuchIsDownloaded = BV.getPlayer().bufferedPercent();
		 $('#progressBar').val(howMuchIsDownloaded);
	});
    
	BV.getPlayer().one('ended', showLogin);
				
	BV.getPlayer().on('play', function() {
		 $('#progressBar').hide();
	});
    
	BV.getPlayer().on('waiting ', function() {
		 $('#progressBar').val(0);
	});
	
	 showVideo();
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
		BV.getPlayer().pause();
		BV.getPlayer().hide();
		$('.skip').hide();
		
		$('.wrapper').show();
		$('.wrapper').animate({ left: '0px'}, 300);
	}

});