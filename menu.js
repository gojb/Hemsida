$(document).ready(function(){
	$(function linkActive() {
		$(".meny a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("ul").siblings("a").addClass("active");
			}
		});
	});
	function Cookie(CookieVar){
		console.log("Cookies!!")
		var namn = CookieVar+"=";
		cookieArray = document.cookie.split(";");
		for(var i = 0; i < cookieArray.length; i++){
			if(cookieArray[i].indexOf(namn)!==-1){
				var cookie = cookieArray[i].substring(namn.length, cookieArray[i].length+1);
				console.log(cookie);
			}else {
				console.log("%c No Cookies for you!!", "font-size: 50px; color: red;");
				$(".lang").css("display", "block");
			}
		}
	}
	$(".swe, .uk").click(function(){
		console.log("Bugtest1");
		console.log($("p",this))
	});
	$(".swe").click(function(){
		console.log("Bugtest2");
		console.log($(this).child)
	});
	
	setTimeout(Cookie("lang"),1000);
});
	
//	function setCookie(name, value, exdays) {
//		var d = new Date();
//		d.setTime(d.getTime() + (exdays*24*60*60*1000));
//		var expires = "expires="+d.toUTCString();
//		document.cookie = name + "=" + value + "; " + expires + "; path=/";
//	}
//
//	function getCookie(cookiename) {
//		var name = cookiename + "=";
//		var ca = document.cookie.split(';');
//		console.log("err");
//		for(var i=0; i<ca.length; i++) {
//			var c = ca[i];
//			while (c.charAt(0)==' ') c = c.substring(1);
//			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//			console.log("e212234234rr");
//		}
//		console.log("3242");
//		return "";
//	}
//
//	function checkCookie() {
//		var lang = getCookie("lang");
//		if (lang != "") {
//			alert("Your language is still " + lang);
//			console.log("e543rr");
//		} else {
//			console.log("e454534231rr");
//			if (lang != "" && lang != null) {
//				setCookie("lang", prompt("Set Language"), 2);
//			}
//		}
//	}