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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, $('.snakeruta')[0].height);
	ctx.lineTo($('.snakeruta')[0].width,$('.snakeruta')[0].height);
	ctx.lineTo($('.snakeruta')[0].width,0);
	ctx.lineTo(0,0);
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(pluppX*pixelstorlek+1, pluppY*pixelstorlek+1, pixelstorlek/2-1, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#ff0000';
	ctx.fill();
	
	var arrayList = [];
	for (var i = 0, len = pixels.length; i < len; i++) {
		arrayList[i] = clone(pixels[i]);
	}
	for (var i = 0; i < arrayList.length; i++) {
		var pixel = arrayList[i];
		ctx.fillStyle=pixel.color;
//		ctx.drawRect(pixel.x*pixelstorlek+1, pixel.y*pixelstorlek+1, pixelstorlek-2, pixelstorlek-2);
		ctx.fillRect(pixel.x*pixelstorlek+1, pixel.y*pixelstorlek+1, pixelstorlek-2, pixelstorlek-2);

	}
	if(paused){
		ctx.fillStyle="#0000FF";
		ctx.font("20px Georgia");
		ctx.fillText("Spelet pausat. Tryck på mellanslag för att fortsätta.", 10, $('.snakeruta')[0].height/2);
	}
	if (gameover) {
		ctx.fillStyle="#FF0000";
		ctx.font("20px Georgia");
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