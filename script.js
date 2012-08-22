$(document).ready(
	function(){
		$('li > div:last-child').hide();
		$('li > div:first-child').on('click', function(){
			var flag = $(this).next().is(':hidden');
			$('li > div:last-child:visible').slideUp().prev().children('div').css('background-image', 'url(down.png)');
			if(flag) $(this).children('div').css('background-image', 'url(up.png)').parent().next().slideDown(); 
		})
		.hover(function(){
			$(this).children('div').css(
					{ 	'-moz-box-shadow' 		: '0px 0px 2px 2px #FFC843',
	    				'-webkit-box-shadow' 	: '0px 0px 2px 2px #FFC843',
   	 					'box-shadow'			: '0px 0px 2px 2px #FFC843'
    				});
    		$(this).children('span').css( { 'text-shadow' : '#FFC843 0px 0px 5px' } );
		}, function(){
			$(this).children('div').css(
					{ 	'-moz-box-shadow' 		: 'none',
    					'-webkit-box-shadow' 	: 'none',
   	 					'box-shadow'			: 'none'
    				});
    		$(this).children('span').css( { 'text-shadow' : 'none' } );
		});
});