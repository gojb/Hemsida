var ctx = $('.snakeruta')[0].getContext("2d");
var pixelstorlek = 9;
var socket;
var vem;
var gameover=false;
var paused=false;
var pluppX=0,pluppY=0;
var pixels = [];
var highscores = [];
res();
if ('WebSocket' in window) {
	socket = new WebSocket("ws://wildfly-gojb.rhcloud.com:8000/snake");
}  else {
	console.log('Error: WebSocket stöds inte.');
}
socket.onopen = function () {

	var namn = prompt("Vad heter du?", "");
	console.log("Öppnar");
	if (namn==null||namn=="") {
		namn="Okänd";
	}
	var letters = '0123456789ABCDEF'.split('');
	var color = '';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	socket.send("INIT "+color+" "+namn);
}
socket.onclose = function () {
	document.getElementById('chat').onkeydown = null;
	console.log('*Ifrånkopplad');
	document.getElementById('från').setAttribute('hidden','');
	document.getElementById('knapp').removeAttribute('hidden');
};

socket.onmessage = function (message) {
	console.log(message.data);
	var scanner = message.data.split(/\s+/);
	var type = scanner.shift();

	if (type == "A") {
		gameover=false;
		paused=false;

		var string = scanner.shift();
		if (string=="PAUSE") {
			paused=true;
		}
		else if (string=="GAMEOVER") {
			console.log(scanner);
			vem=scanner;
			gameover = true;
		}
//		frame.repaint();
	}
	else if (type=="P") {
		pluppX=scanner.shift();
		pluppY=scanner.shift();
	}
	else if (type=="B") {
		if (scanner.shift()==0) {
			pixels=[];
		}
		var color = "#"+scanner.shift();
		while (scanner.length>1) {
			pixels.push(new Pixel(scanner.shift(), scanner.shift(), color));
			i++;
		}
		paint();
	}
	else if (type=="H") {
		var mode = scanner.shift();
		if (mode == "RESET") {
			highscores=[];
		}
		else if (mode=="SET") {
			highscores.push(new Highscore(scanner));
		}
		else if (mode=="DONE") {
			$('.highscore').empty();
			$('.highscore').append(
					'<tr>'+
					'<th>Spelare</th>'+
					'<th>Poäng</th>'+
					'<th>Highscore</th>'+
					'</tr>'
			);
			for(var i=0;i<highscores.length;i++){
				console.log("rtgpösrfop");
				var highscore=highscores[i];
				$('.highscore').append(
						'<tr style="color:'+highscore.color+';">'+
						'<td>'+highscore.namn+'</td>'+
						'<td>'+highscore.poäng+'</td>'+
						'<td>'+highscore.highscore+'</td>'+
						'</div>'
				);
			}
		}

	}



};
$(window).keydown(function (e) {
	console.log("press"+e)
	if(e.which == 37)
		socket.send("R left");
	else if(e.which == 39)
		socket.send("R right");
	else if(e.which == 38)
		socket.send("R up");
	else if(e.which == 40)
		socket.send("R down");
	else if (e.which == 82||e.keyCode == 113){
		socket.send("RES");
		socket.send("START");
	}
	else if(e.which == 32)
		socket.send("PAUSE");
});
function paint(){
	ctx.clearRect(0, 0, $('.snakeruta')[0].width, $('.snakeruta')[0].height);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, $('.snakeruta')[0].height);
	ctx.lineTo($('.snakeruta')[0].width,$('.snakeruta')[0].height);
	ctx.lineTo($('.snakeruta')[0].width,0);
	ctx.lineTo(0,0);
	ctx.strokeStyle = '#000000';
	ctx.stroke();


	ctx.beginPath();
	ctx.arc(pluppX*pixelstorlek+pixelstorlek/2+1, pluppY*pixelstorlek+pixelstorlek/2+1, pixelstorlek/2-1, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#ff0000';
	ctx.fill();

	var arrayList = clone(pixels);
	for (var i = 0; i < arrayList.length; i++) {
		var pixel = arrayList[i];
		ctx.fillStyle=pixel.color;
		ctx.fillRect(pixel.x*pixelstorlek+2, pixel.y*pixelstorlek+2, pixelstorlek-2, pixelstorlek-2);
	}
	if(paused){
		ctx.fillStyle="#0000FF";
		ctx.font="20px Bitter";
		ctx.fillText("Spelet pausat. Tryck på mellanslag för att fortsätta.", 10, $('.snakeruta')[0].height/2);
	}
	if (gameover) {
		ctx.fillStyle="#FF0000";
		ctx.font="20px Bitter";
		ctx.fillText(vem+" förlorade!",25 , $('.snakeruta')[0].height/2-25);
	}
}
class Pixel{
	constructor(x,y,color) {
		this.x=x;
		this.y=y;
		this.color=color;
	}
}
class Highscore{
	constructor(scanner){
		this.poäng=scanner.shift();
		this.color="#"+scanner.shift();
		this.highscore=scanner.shift();
		this.namn=scanner;
	}
}
$(window).resize(function r() {
	res();
});
function res() {
	var scrollTop = $(window).scrollTop(),
	scrollBot = scrollTop + $(window).height(),
	top = $('.middle').offset().top,
	bottom = top + $('.middle').innerHeight(),
	visibleTop = top < scrollTop ? scrollTop : top,
	visibleBottom = bottom > scrollBot ? scrollBot : bottom;
	pixelstorlek=Math.floor((visibleBottom - visibleTop)/50);
resa();
	while ($(window).get(0) ? $(window).get(0).scrollHeight > $(window).innerHeight() : false) {
		console.log("hdfc,m");
		pixelstorlek--;
		resa();
		
	}
}
function resa() {    
	console.log(pixelstorlek);
	$('.snakeruta')[0].height=pixelstorlek*50+2;
	$('.snakeruta')[0].width=pixelstorlek*50+2;
}
(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
    }
})(jQuery);
function clone(obj) {
	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj) return obj;

	// Handle Date
	if (obj instanceof Date) {
		var copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	// Handle Array
	if (obj instanceof Array) {
		var copy = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			copy[i] = clone(obj[i]);
		}
		return copy;
	}

	// Handle Object
	if (obj instanceof Object) {
		var copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
		}
		return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
}