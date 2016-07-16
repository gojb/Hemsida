var ctx = $('.snakeruta')[0].getContext("2d");
var pixelstorlek = 10;
var socket;
var vem;
var gameover;
var paused;
var pluppX,pluppY;
var pixels = []
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
	Console.log('*Ifrånkopplad');
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
		var color = scanner.shift();
		while (scanner.length>1) {
			pixels.push(new Pixel(scanner.shift(), scanner.shift(), color));
		}
//		repaint();
	}
	else if (type=="H") {
		var mode = scanner.shift();
		if (mode == "RESET") {
//			highscores.clear();
		}
		else if (mode=="SET") {
//			highscores.add(new Highscore(scanner));
		}
		else if (mode=="DONE") {


		}
	}
};
class Pixel{
	constructor(x,y,color) {
		this.x=x;
		this.y=y;
		this.color=color;
	}
}
