
$(document).ready(function() {
	var bredd;
	$("#navToggle a").click(function(e){
		e.preventDefault();
		$("header > nav").slideToggle();
		$("#logo").toggleClass("menuUp menuDown");
	});

	$(window).resize(function() {
		console.log($(".meny").width() + "  " + bredd);
		if($(".meny").width() < bredd) {
			$("header > nav").css("display", "block");
			console.log("JA");
			if($("#logo").attr('class') == "menuDown") {
				$("#logo").toggleClass("menuUp menuDown");
			}
		}
		else {
			$("header > nav").css("display", "none");
		}
	});

	$("header > nav > ul > li > a").click(function(e) {
		if($( window ).width() <= "600") {
			if($(this).siblings().size() > 0 ) {
				e.preventDefault();
				$(this).siblings().slideToggle("fast")
				$(this).children(".toggle").html($(this).children(".toggle").html() == 'close' ? 'expand' : 'close');
			}
		}
	});
	<!--	Resize font h1-ish	-->
	var i = 0;
	$(window).resize(function(){
		//console.log($('.top').width()+"  top");
		//console.log($(window).width()+"  doc");
		if($(document).width()>$('top').width()&&$(document).width()<500){
			var docWidth = $(window).width();
			//var topWidth = document.getElementById('top');
			//var Width = (topWidth.clientWidth()+1);

			var topWidth = document.getElementById('top').clientWidth;

		//	console.log(topWidth + "  top-----------");
			if(docWidth-topWidth<100){
				/*     		document.getElementById('top').style.fontSize = '75%';
				 */    		
				$('.top').css('font-size','75%');
			}
			else{
				/*     		document.getElementById('top').style.fontSize = '100%';
  $('.top').css('font-size','100%');*/
				$('.top').css('font-size','');
				$('.top').css('font-size','100%');
			}
		}
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
			console.log("hej2");

		});
		console.log($width);
		
		// if modern browser
		bredd=$width;
	});
	$('.prg').mouseenter(function(){
		console.log($('.Plus').css("border-top"))
	});
	$('.prg').mouseout(function(){
		console.log("gvfdjk")
	});
	
	
	
});