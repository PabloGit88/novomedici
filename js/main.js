$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
	$('.vjs-error').hide();

	
	var BV,
        isTouch = Modernizr.touch;
     
    
    BV = new $.BigVideo({forceAutoplay:isTouch});
    BV.init();
    
    BV.getPlayer().on('loadstart', function() {
		$('.progressBar').show();
		console.log('loadstart');
	});
     
    var skipped= false;
    var playing = false;
	BV.getPlayer().on('progress', function() {
		var howMuchIsDownloaded = BV.getPlayer().bufferedPercent();
		if (howMuchIsDownloaded > 0.49 ){
			if (!playing)
				BV.getPlayer().play();
			playing = true;
		}
		else{
			if (!skipped){
				$('.progressBar').animate({ width: (howMuchIsDownloaded * 100) + '%'}, 'fast');
			
			}
		}
	});
	
    var background = false;
	var loginShowed = false;
	BV.getPlayer().on('timeupdate', function() {
		
		var currentTime = BV.getPlayer().currentTime();
		if ( currentTime > 14 && !loginShowed) {
			loginShowed = true;
			showLogin();
		}
		if ( currentTime > 16 && !background) {
			background = true;
			showBackground();
		}
	});
	

	BV.getPlayer().one('ended', showLogin);
	BV.getPlayer().on('play', function() {
		console.log('play');
		$('.progressBar').hide();
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
    
    function showBackground()
    {
       	background = true;	
		$('.progressBar').hide();
		$('.skip').hide();
		$('.backgroundImage').show();
		$('.backgroundImage').animate({ right: '0px'}, 'fast');
		$('.mute  a').hide();
		BV.getPlayer().muted(true);
    }

	function showLogin(){
		skipped = true;
		$('.progressBar').hide();
		$('.wrapper').show();
		$('.wrapper').animate({ right: '0px'}, 300);
	}
	
	
	$('.skip  a').click(function(e)
	{ 
		showBackground();
		showLogin();
		e.preventDefault();
		$('.progressBar').hide();
		BV.getPlayer().pause();
		
	});

	$('.mute  a').click(function(e)
	{ 
		console.log( $('.mute  a').html());
		if ( $('.mute  a').html() == 'Audio Off'){
			 $('.mute  a').html('Audio On');
			BV.getPlayer().muted(true);
		}
		else{
			 	$('.mute  a').html('Audio Off');
				BV.getPlayer().muted(false);
		}
	});
	
});