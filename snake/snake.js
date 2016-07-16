var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var pixelstorlek = 10;
canvas.width = pixelstorlek*50+1;
canvas.height =  pixelstorlek*50+1;
document.body.appendChild(canvas);