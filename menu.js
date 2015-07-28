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
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
		}

		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1);
				if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			}
			return "";
		}

		function checkCookie() {
			var user = getCookie("username");
			if (user != "") {
				alert("Welcome again " + user);
			} else {
				if (user != "" && user != null) {
					setCookie("username", prompt("Set Username"), 2);
				}
			}
		}
		checkCookie();
	}
	document.setTimeout(2000, Cookie());

		});

