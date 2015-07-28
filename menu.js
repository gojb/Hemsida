$(document).ready(function(){
var i = 0;;
$('h1').click(function(){
	i++;
   $('<p>').appendTo('.middle').text("null"+i);
});
$('p').click(function(){
    console.log("asd");
    $('p').remove(':contains("null'+i+'")');
    i--;
});
});