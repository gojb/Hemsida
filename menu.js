$(document).ready(function(){
	$(function linkActive() {
		$(".meny a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("ul").siblings("a").addClass("active");
			}
		});
	});
		});
function Cookie(){
	console.log("Cookies!!")
	function setCookie(name, value, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = name + "=" + value + "; " + expires + "; path=/";
	}

	function getCookie(cookiename) {
		var name = cookiename + "=";
		var ca = document.cookie.split(';');
		console.log("err");
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
			console.log("e212234234rr");
		}
		console.log("3242");
		return "";
	}

	function checkCookie() {
		var lang = getCookie("lang");
		if (lang != "") {
			alert("Your language is still " + lang);
			console.log("e543rr");
		} else {
			console.log("e454534231rr");
			if (lang != "" && lang != null) {
				setCookie("lang", prompt("Set Language"), 2);
			}
		}
	}
	checkCookie();
}
setTimeout(Cookie(),1000);
