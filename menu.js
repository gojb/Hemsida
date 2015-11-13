$(document).ready(function(){
	var bredd=0;
	var visible = false;
	$('.header').children().each(function(){
		console.log($(this).attr("class") + "  " +$(this).outerWidth(true));
		bredd+=$(this).outerWidth(true);
	});
	console.log("TOTALT" + bredd);
	res();
	$('.smal .meny').css("left", "-250px");
	$('.smal').css("left", "0");
	$(function linkActive() {
		$(".meny a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("ul").siblings("a").addClass("active");
			}
		});
	});
	$(window).resize(function () {
		res();
	});
	function res(){
		console.log("adftg");
		console.log("bredd: "+bredd);
		console.log("header"+$(".header").width());
		if($(".header").width()<bredd){
			$('body').addClass("smal");
			// your element has overflow
			$('body').removeClass("bred");
		}
		else{
			$('body').addClass("bred");
			// your element has overflow
			$('body').removeClass("smal");
		}
	}
	function Cookie(CookieVar){
		var namn = CookieVar+"=";
		var elseAmount = 0;
		cookieArray = document.cookie.split(";");
		for(var i = 0; i < cookieArray.length; i++){
			if(cookieArray[i].indexOf(namn)!==-1){

				var cookie = cookieArray[i].substring(namn.length, cookieArray[i].length+1);

				if(cookie.indexOf("=")!==-1){
					console.log(cookieArray[i].substring(namn.length+1, cookieArray[i].length+1 + "   = finns"));
					cookie=cookieArray[i].substring(namn.length+1, cookieArray[i].length+1);
				}
				else{
					console.log("= finns inte  "+cookie);
				}
				if(cookie.toLowerCase()===($(".swe").children("p").text()).toLowerCase()){
					console.log("Swe");
				}
				else if(cookie.toLowerCase()===($(".uk").children("p").text()).toLowerCase()){
					console.log("eng");
					englishLang();
				}
				else{
					console.log("ERROR with cookie  ");
				}
			}else {
				elseAmount++;
				if(elseAmount==cookieArray.length){
					console.log("%c No Cookies for you!!", "font-size: 50px; color: red;");
					$(".lang").css("display", "block");
					visible=true;
				}
			}
		}
	}

	$(".swe, .uk").click(function(){
		var chosenLang = $(this).children("p").text();
		var date = new Date();
		date.setTime(date.getTime()+(365*86400000));
		var UTC = date.toUTCString();
		document.cookie = "lang="+chosenLang+"; expires="+UTC+";path=/";

		console.log(document.cookie);
		$('.lang').css("display", "none")
		location.reload();
	});

	Cookie("lang");

	$(".ChangeLang").click(function(){
		console.log($(".ChangeLang").css("display"));
		if(visible==false){
		$(".lang").css("display", "block");
		visible=true;
		}
		else if(visible==true){
			$('.lang').css("display", "none");
			visible=false;
		}
	});

	function englishLang(){
		var htmlId = [
		              /*0*/"Home",
		              /*1*/"Chat",
		              /*2*/"Gojbs Goodies",
		              /*3*/"About us",
		              /*4*/"Welcome to GoJb Development's official website!",
		              /*5*/ "This page is coded from scratch, no website builder has been used! <br />" +
		              /*fortfarande 5*/"We can program Java and Web (CSS, JS, HTML and so on). We are not educated in this" +
		              /*fortfarande 5*/", we have learnt it all from books and the internet",
		              /*6*/"This page is created for the latest verision of Google Chrome and we " +
		              /*fortfarande 6*/"can't guarantee that it works as it should in other browsers. So if you don't have it already,  " +
		              /*fortfarande 6*/"<a href='https://www.google.se/chrome/browser/desktop/'>download Google Chrome now!</a>",
		              /*7*/"You can here connect to GoJb's chat. The program uses websocket to comunicate with  our servers" +
		              /*fortfarande 7*/" so you can chat with everyone that are online at the moment.",
		              /*8*/"Programs",
		              /*9*/"<input type='text' placeholder='Enter a message and press ENTER to send' id='chat' /> <button type='button' " +
		              /*fortfarande 9*/" id='knapp'>Connect</button><button type='button' id='knapp2'> The sound is disabled</button>",
		              /*10*/"<h1>Error 404 - Page not found</h1><p>The page you are trying to reach was not found</p>"
		              ]/*I htmlId är 0-3 i menu.html, 4-6 på startsidan, 7 är chat, 8 är "program" i menyn*/
		for(var i = 0; i < htmlId.length; i++){
			$("#"+i).html(htmlId[i]);
		}
	}

	$('.menuKnapp').click(function(){
		if($('.meny').css("left")==="-250px"){
			$('.meny').animate({
				left: '0'
			},200);
			$('.smal').animate({
				left: '250' 
			}, 300);
		}

		else{
			$('.meny').animate({
				left: '-250'
			},300);
			$('.smal').animate({
				left: '0' 
			}, 200);
		}
	});
	$(".middle, .stängKnapp").click(function(){
		if($('.meny').css("left")==="0px"){
				$('.meny').animate({
					left: '-250'
				},300);
				$('.smal').animate({
					left: '0' 
				}, 200);
		}
	});
	$(".meny>ul>li").click(function(){
		console.log($(this).children().attr("href"));
	});

});
