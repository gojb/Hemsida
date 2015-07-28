$(document).ready(function()
		{
	$(".bild").error(function(){
		$(this).attr('src', '/images/rect8147.png');
	});
	$(".menucss").error(function(){
		$(this).attr('href', '/menu.css');
	});
	$(function linkActive() {
		$("a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("ul").siblings("a").addClass("active");
			}
		});
	});
	function Cookie(){
		console.log("Cookie!");
	}
	Cookie();

		});

