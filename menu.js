$(document).ready(function()
{
    $(".bild").error(function(){
        $(this).attr('src', '/images/rect8147.png');
    });
    $(function linkActive() {
		$("a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("ul").siblings("a").addClass("active");
			}
		});
	});
});