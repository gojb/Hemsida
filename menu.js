
$(document).ready(function() {
	var bredd;
	$("#navToggle a").click(function(e){
		e.preventDefault();
		$("header > nav").slideToggle();
		$("#logo").toggleClass("menuUp menuDown");
	});
	function resize() {
		console.log($('#header').height() + "  Höjdd");
		console.log($(document).width() + "  " + bredd);
		console.log($(window).width() + "  " + bredd);
		console.log($('#header').height()>100);
		console.log($('#header').outerWidth());
		if($('#header').height()>100||$(window).width() < bredd) {
			$("header > nav").css("display", "none");
			$("#header").removeClass("bred");
			$("#header").addClass("smal");
			$(".smal").animate({
				left: "-250px"
			},1)
		}
		else {
			$("header > nav").css("display", "block");
			if($("#logo").attr('class') == "menuDown") {
				$("#logo").toggleClass("menuUp menuDown");
			}
			$("#header").removeClass("smal");
			$("#header").addClass("bred");
		}
		var docWidth = $(window).width();
		if(docWidth<520){ 		
			$('.top').css('font-size','75%');
			console.log("75");
		}
		else{
			console.log("100");
			$('.top').css('font-size','100%');
		}
	}


	$("header > nav > ul > li > a").click(function(e) {
		if($('#header').hasClass("smal")) {
			if($(this).siblings().size() > 0 ) {
				e.preventDefault();
				$(this).animate({
					left: "0"
				}, 300);
				$("body").animate({
					left: "250px"
				}, 300);
//				$(this).siblings().slideToggle("fast")
//				$(this).children(".toggle").html($(this).children(".toggle").html() == 'close' ? 'expand' : 'close');
			}
		}
	});
	<!--	Resize font h1-ish	-->
	var i = 0;
	$(window).resize(function(){
		resize();
	});

	$(function() {
		$("a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("nav").siblings("a").addClass("active");
			}
		});
	});  
	$(function() {

		console.log("hej");

		/* 	width of menu list (non-toggled) */

		var $width = 0;
		$(".meny").find('ul li').each(function() {
			$width += $(this).outerWidth();
			console.log("hej  " + $(this).outerWidth());
		});
//		$(".meny").find('ul li span').each(function() {
//			$width += $(this).outerWidth();
//			console.log("span" + $(this).outerWidth());
//		});
		$width += $("#logo").outerWidth();
		console.log($width + "  " + ($width+($("#header").css("padding-left").replace("px","")*2)));
		console.log($("#header").css("padding-left").replace("px",""));
		console.log(Math.ceil($("#header").css("padding-left").replace("px",""))*2);
		bredd=$width+(Math.ceil($("#header").css("padding-left").replace("px",""))*2);
		resize();
	});
	$('.prg').mouseenter(function(){
		console.log($('.Plus').css("border-top"))
	});
	$('.prg').mouseout(function(){
		console.log($)
	});



});