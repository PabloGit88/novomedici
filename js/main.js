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
    
    BV.getPlayer().on('loadstart', function() {
		$('.progressBar').show();
		console.log('loadstart');
	});
     
  
	BV.getPlayer().on('progress', function() {
		var howMuchIsDownloaded = BV.getPlayer().bufferedPercent();
		if (howMuchIsDownloaded > 0.49 ){
			BV.getPlayer().play();
		}
		else{
			$('.progressBar').animate({ width: (howMuchIsDownloaded * 100) + '%'}, 'fast');
		}
	});
    
	BV.getPlayer().one('ended', showLogin);
				
	BV.getPlayer().on('play', function() {
		console.log('play');
		$('.progressBar').hide();
	});
    
	BV.getPlayer().on('waiting', function() {
		$('.progressBar').show();
	});
	
	showVideo();
	
    function showVideo() 
    {
    	var videoBaseSrc = $('.videoBackground').data('videoBaseSrc');
		var types = [ ];
		
		if ( BrowserDetect.browser == 'Firefox' )
			types = [ { type: "video/webm", src: videoBaseSrc + ".webm" } ];
		else if (BrowserDetect.browser == 'Other' )
			types = [ { type: "video/mp4",  src: videoBaseSrc + "_720.mp4" } ];
		else 
			types = [ { type: "video/mp4",  src: videoBaseSrc + "_720.mp4" },{ type: "video/webm", src: videoBaseSrc + ".webm" },{ type: "video/ogg",  src: videoBaseSrc + ".ogv" } ];
		
		BV.show(types,{ ambient:false });
    }

	function showLogin(){
		BV.getPlayer().pause();
		BV.getPlayer().hide();
		$('.skip').hide();
		$('#progressBar').hide();
		$('.wrapper').show();
		$('.wrapper').animate({ left: '0px'}, 300);
	}

});