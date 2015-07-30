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
		var elseAmount = 0;
		cookieArray = document.cookie.split(";");
		for(var i = 0; i < cookieArray.length; i++){
			if(cookieArray[i].indexOf(namn)!==-1){

				var cookie = cookieArray[i].substring(namn.length, cookieArray[i].length+1);

				if(cookie.indexOf("=")!==-1){
					console.log(cookieArray[i].substring(namn.length+1, cookieArray[i].length+1));
					console.log("= finns");
				}else{
					console.log("%c= finns <strong>INTE</strong>", "strong{font-weight: bold;}");
					console.log(cookie)
				}

			}else {
				elseAmount++;
				if(elseAmount==cookieArray.length){
					console.log("%c No Cookies for you!!", "font-size: 50px; color: red;");
					$(".lang").css("display", "block");
				}
			}
		}
	}
	$(".swe, .uk").click(function(){
		var chosenLang = $(this).children("p").text();
		var date = new Date();
		date.setTime(date.getTime()+(365*86400000));
		var UTC = date.toUTCString();
		document.cookie = "lang="+chosenLang+"; expires="+UTC+";";

		console.log(document.cookie);
		$('.lang').css("display", "none")
	});

	Cookie("lang");

	$(".ChangeLang").click(function(){
//		$(".lang").css("display", "block")
		englishLang();
	});

	var englishLang = function(){
		var htmlId = [
		              /*0*/"Home",
		              /*1*/"UNUSED",
		              /*2*/"Gojbs Goodies",
		              /*3*/"About us",
		              /*4*/"Welcome to GoJb Development's official website!",
		              /*5*/ "This page is coded from scratch, no website builder has been used! <br />" +
		              /*fortfarande 5*/"We can program Java and Web (CSS, JS, HTML and so on). We are not educated in this" +
		              /*fortfarande 5*/", we have learnt it all from books and the internet",
		              /*6*/"This page is created for the latest verision of Google Chrome and we" +
		              /*fortfarande 6*/"can't guarantee that it works as it should in other browsers. So if you don't have it already, ",
		              /*7*/"download Google Chrome now!"
		              
		              ]/*I htmlId är 0-3 i menu.html, 4-7 på startsidan*/
		for(var i = 0; i < html.length; i++){
			$("#"+i).text(html[i]);
		}
	}

});

//function setCookie(name, value, exdays) {
//var d = new Date();
//d.setTime(d.getTime() + (exdays*24*60*60*1000));
//var expires = "expires="+d.toUTCString();
//document.cookie = name + "=" + value + "; " + expires + "; path=/";
//}

//function getCookie(cookiename) {
//var name = cookiename + "=";
//var ca = document.cookie.split(';');
//console.log("err");
//for(var i=0; i<ca.length; i++) {
//var c = ca[i];
//while (c.charAt(0)==' ') c = c.substring(1);
//if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//console.log("e212234234rr");
//}
//console.log("3242");
//return "";
//}

//function checkCookie() {
//var lang = getCookie("lang");
//if (lang != "") {
//alert("Your language is still " + lang);
//console.log("e543rr");
//} else {
//console.log("e454534231rr");
//if (lang != "" && lang != null) {
//setCookie("lang", prompt("Set Language"), 2);
//}
//}
//}