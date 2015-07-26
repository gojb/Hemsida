
$(document).ready(function() {
	var bredd;
	$("#navToggle a").click(function(e){
		e.preventDefault();
		$("header > nav").slideToggle();
		$("#logo").toggleClass("menuUp menuDown");
	});

	$(window).resize(function() {
resize();
	});

	$("header > nav > ul > li > a").click(function(e) {
		if($(".meny").width() > bredd) {
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
	function resize() {
		console.log($(".meny").width() + "  " + bredd*1.05);
		if($(".meny").width() > bredd) {
			$("header > nav").css("display", "block");
			$("#header").addClass("bred");
			if($("#logo").attr('class') == "menuDown") {
				$("#logo").toggleClass("menuUp menuDown");
			}
		}
		else {
			$("#header").removeClass("bred");
			$("header > nav").css("display", "none");
		}
	}

	$(function() {
		$("a").each(function() {
			if (window.location.href == (this.href)) {
				$(this).addClass("active");
				$(this).parents("nav").siblings("a").addClass("active");
			}
		});
	});  

	var $width = 0;
	$(".meny").find('ul li').each(function() {
		$width += $(this).outerWidth();
		console.log("hej2");

	});
	
	var plus1 = 0;
	var plus2 = 90;
	
	console.log($width);
	bredd=$width;
	
	$('.prg').mouseenter(function(){
		plus1=plus1+180;
		plus2=plus2+90;
		$('nav>ul>li>a span.Plus1').css('transform', "rotate("+plus1+"deg)");
		$('span.Plus1').css('transform', "rotate("+plus2+"deg)");
		console.log("Plus1 = " + plus1 + "  Plus2 = " + plus2);
		console.log("232");
		
	});
	$('.prg').click(function(){
		console.log($('.Plus').css("border-top"))
	});
	$('.prg').mouseout(function(){
		console.log($('.Plus').css('transform'))
	});

	resize();

});