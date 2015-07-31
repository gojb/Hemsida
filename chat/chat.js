
var socket;

function connect() {
	if ('WebSocket' in window) {
		socket = new WebSocket("ws://wildfly-gojb.rhcloud.com:8000/");
	}  else {
		Console.log('Error: WebSocket stöds inte.');
	}
	socket.onopen = function () {
		var person = prompt("Vad heter du?", "");
		socket.send(person);
		Console.log('Info: Anslutning Öppnad');
		document.getElementById('knapp').setAttribute('disabled','disabled');
		document.getElementById('9').onkeydown = function(event) {
			if (event.keyCode == 13) {
				sendMessage();
			}
		};
	};

	socket.onclose = function () {
		document.getElementById('9').onkeydown = null;
		Console.log('Info: WebSocket stängd.');
		document.getElementById('knapp').removeAttribute('disabled');
	};

	socket.onmessage = function (message) {
		Console.log(message.data);

	};
};




function sendMessage() {
	var message = document.getElementById('9').value;
	if (message != '') {
		socket.send(message);
		document.getElementById('9').value = '';
	}
};

var Console = {};

Console.log = (function(message) {	
	var console = document.getElementById('console');
	var p = document.createElement('p');
	p.style.wordWrap = 'break-word';
	p.innerHTML = message;
	console.appendChild(p);
	while (console.childNodes.length > 25) {
		console.removeChild(console.firstChild);
	}
	console.scrollTop = console.scrollHeight;
	var title = document.title;
	document.title = "Nytt meddelande";
	playSound();
	setTimeout(function(){document.title = title},3000);

});

function playSound(){   

	document.getElementById('ljud').play();
}
function sound(){
	if(document.getElementById('ljud').muted == false){
		document.getElementById('knapp2').innerText = "Ljudet är av";
		document.getElementById('ljud').muted = true;
	}
	else{
		document.getElementById('knapp2').innerText = "Ljudet är på";
		document.getElementById('ljud').muted = false;
	}
}
function start(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		document.getElementById('ljud').controls = true;
	}
}
start();


