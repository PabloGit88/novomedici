$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
	$('.vjs-error').hide();

	var BV,
        isTouch = Modernizr.touch,
        skipped = false,
        playing = false;     
    
    BV = new $.BigVideo({forceAutoplay:isTouch});
    BV.init();
    
    
    /** Player events **/
    BV.getPlayer().on('loadstart', function() 
    {
		$('.progressBar').show();
	});
    
	BV.getPlayer().on('progress', function() 
	{
		var howMuchIsDownloaded = BV.getPlayer().bufferedPercent();
		
		//If was downloaded the half of the video
		if (howMuchIsDownloaded > 0.49 || howMuchIsDownloaded == 0)
		{
			BV.getPlayer().play();
		}
		else
		{
			$('.progressBar').show();
			$('.progressBar').animate({ width: (howMuchIsDownloaded * 100) + '%'}, 'fast');
		}
	});
	
	BV.getPlayer().one('ended', showLogin);
	BV.getPlayer().on('play', function() 
	{
		$('.progressBar').hide();
	});
	
	/** Check the time of the movie to detect when the elements appers **/
    var background = false;
	var loginShowed = false;
	BV.getPlayer().on('timeupdate', function() 
	{
		var currentTime = BV.getPlayer().currentTime();
		if ( currentTime > 13.10 && !loginShowed) {
			loginShowed = true;
			showLogin();
		}
		if ( currentTime > 14.05 && !background) {
			background = true;
			showBackground();
		}
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
    
    function showBackground(speed)
    {
    	speed = typeof speed !== 'undefined' ? speed : 1000;
    	
       	background = true;	
		$('.progressBar').hide();
		$('.skip').hide();
		$('.backgroundImage').show();
		$('.backgroundImage').animate({ right: '0px'}, speed);
		$('.mute a').hide();
		BV.getPlayer().muted(true);
    }

	function showLogin(speed)
	{
		speed = typeof speed !== 'undefined' ? speed : 500;
		
		skipped = true;
		$('.progressBar').hide();
		$('.wrapper').show();
		$('.wrapper').animate({ right: '0px'}, speed);
	}
	
	$('.skip a').click(function(e)
	{ 
		showBackground(500);
		showLogin(500);
		e.preventDefault();
		$('.progressBar').hide();
		BV.getPlayer().pause();
	});

	$('.mute a').click(function(e)
	{ 
		if ($('.mute  a').html() == 'Audio Off')
		{
			 $('.mute  a').html('Audio On');
			BV.getPlayer().muted(true);
		}
		else
		{
		 	$('.mute  a').html('Audio Off');
			BV.getPlayer().muted(false);
		}
	});
	
});