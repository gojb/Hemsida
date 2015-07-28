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
		});
function Cookie(){
	function setCookie(name, value, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = name + "=" + value + "; " + expires + "; path=/";
	}

	function getCookie(cookiename) {
		var name = cookiename + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}

	function checkCookie() {
		var lang = getCookie("lang");
		if (lang != "") {
			alert("Welcome again " + user);
		} else {
			if (user != "" && user != null) {
				setCookie("lang", prompt("Set Language"), 2);
			}
		}
	}
	checkCookie();
}
setTimeout(Cookie(),10000);
