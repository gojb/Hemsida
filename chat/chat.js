$(document).ready(function(){
	console.log("wdflijbnsödijg");

	$("#knapp").click(function(){ /*Anslut */
		if($("#knapp2").text().length<16){
			//Svenska
			connect("swe");
		}
		else{
			//Engleska
			connect("uk");
		}
	});

	$("#knapp2").click(function(){ /*Ljud på/av */
		if($("#knapp2").text().length<16){
			//Svenska
			sound("swe");
		}
		else{
			//Engleska
			sound("uk");
		}
	});

	var socket;

	function connect(lang) {
		if(lang=='swe'){
			if ('WebSocket' in window) {
				socket = new WebSocket("ws://wildfly-gojb.rhcloud.com:8000/chat");
			}  else {
				Console.log('Error: WebSocket stöds inte.');
			}
			socket.onopen = function () {
				var person = prompt("Vad heter du?", "");
				socket.send("SWE" + person);
				Console.log('Info: Anslutning Öppnad');
				document.getElementById('knapp').setAttribute('disabled','disabled');
				document.getElementById('chat').onkeydown = function(event) {
					if (event.keyCode == 13) {
						sendMessage();
					}
				};
			};

			socket.onclose = function () {
				document.getElementById('chat').onkeydown = null;
				Console.log('Info: WebSocket stängd.');
				document.getElementById('knapp').removeAttribute('disabled');
			};

			socket.onmessage = function (message) {
				Console.log(message.data);

			};
		}

		if(lang=='uk'){
			if ('WebSocket' in window) {
				socket = new WebSocket("ws://wildfly-gojb.rhcloud.com:8000/chat");
			}  else {
				Console.log('Error: WebSocket is not supported.');
			}
			socket.onopen = function () {
				var person = prompt("What's your name?", "");
				socket.send("ENG" + person);
				Console.log('Info: Connection opened');
				document.getElementById('knapp').setAttribute('disabled','disabled');
				document.getElementById('chat').onkeydown = function(event) {
					if (event.keyCode == 13) {
						sendMessage();
					}
				};
			};

			socket.onclose = function () {
				document.getElementById('chat').onkeydown = null;
				Console.log('Info: WebSocket closed.');
				document.getElementById('knapp').removeAttribute('disabled');
			};

			socket.onmessage = function (message) {
				Console.log(message+" <-- message")
				Console.log(message.data);
			};
		}

	}

	function sendMessage() {
		var message = document.getElementById('chat').value;
		if (message !== '') {
			socket.send(message);
			document.getElementById('chat').value = '';
		}
	}

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
		setTimeout(function(){
			document.title = title;
		},3000);

	});

	function playSound(){   

		document.getElementById('ljud').play();
	}
	function sound(lang){
		if(lang=='swe'){
			if(document.getElementById('ljud').muted === false){
				document.getElementById('knapp2').innerText = "Ljudet är av";
				document.getElementById('ljud').muted = true;
			}
			else{
				document.getElementById('knapp2').innerText = "Ljudet är på";
				document.getElementById('ljud').muted = false;
			}
		}

		if(lang=='uk'){
			if(document.getElementById('ljud').muted === false){
				document.getElementById('knapp2').innerText = "The sound is disabled";
				document.getElementById('ljud').muted = true;
			}
			else{
				document.getElementById('knapp2').innerText = "The sound is enabled";
				document.getElementById('ljud').muted = false;
			}
		}

	}
	function start(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			document.getElementById('ljud').controls = true;
		}
	}
	start();

});