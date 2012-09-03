$(document).ready(
	function(){
		$('li > div:last-child').hide();
		$('li > div:first-child').on('click', function(){
			var flag = $(this).next().is(':hidden');
			$('li > div:last-child:visible').slideUp().prev().children('div').css('background-image', 'url(down.png)');
			if(flag) $(this).children('div').css('background-image', 'url(up.png)').parent().next().slideDown(); 
		});
});