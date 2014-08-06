//states:
//1:init game draw boards
//2:white move
//3:black move
var state = 1;

function state1(){
	drawBoard();
	appendClick();
	$("#status").html("Waiting on White.");
	state = 2;
}