var ctx = $('.snakeruta')[0].getContext("2d");
var pixelstorlek = 9;
var socket;
var vem;
var gameover=false;
var paused=false;
var pluppX=0,pluppY=0;
var pixels = []
$('.snakeruta')[0].height=pixelstorlek*50+1;
$('.snakeruta')[0].width=pixelstorlek*50+1;
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
		var color = "#"+scanner.shift();
		var i=0;
		while (scanner.length>1) {
			pixels.push(new Pixel(scanner.shift(), scanner.shift(), color));
			i++;
		}
		console.log(i);
		paint();
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
function paint(){
	g.setColor(Color.black);
	g.drawLine(0, 0, 0, getHeight());
	g.drawLine(0, 0, getWidth(), 0);
	g.drawLine(0,getHeight(),getWidth(), getHeight());
	g.drawLine(getWidth(),0,getWidth(), getHeight());
	//Client
	g.setColor(red);
	g.drawOval(pluppX*pixelstorlek+1, pluppY*pixelstorlek+1, pixelstorlek-2, pixelstorlek-2);
	g.fillOval(pluppX*pixelstorlek+1, pluppY*pixelstorlek+1, pixelstorlek-2, pixelstorlek-2);

	var arrayList = [];
    for (var i = 0, len = pixels.length; i < len; i++) {
    	arrayList[i] = clone(pixels[i]);
    }
	for (var i = 0; i < arrayList.length; i++) {
		var pixel = arrayList[i];
		ctx.fillStyle(pixel.color);
		ctx.drawRect(pixel.x*pixelstorlek+1, pixel.y*pixelstorlek+1, pixelstorlek-2, pixelstorlek-2);
		ctx.fillRect(pixel.x*pixelstorlek+1, pixel.y*pixelstorlek+1, pixelstorlek-2, pixelstorlek-2);
	}
}
if(paused){
	g.setColor(blue);
	g.setFont(new Font(null, 0, 25));
	g.drawString("Spelet pausat. Tryck på mellanslag för att fortsätta.", 10, getHeight()/2);
}
if (gameover) {
	g.setColor(red);
	g.setFont(new Font(null, 0, 25));
	g.drawString(vem+" förlorade!",25 , getHeight()/2-25);
}
}
class Pixel{
	constructor(x,y,color) {
		this.x=x;
		this.y=y;
		this.color=color;
	}
}
