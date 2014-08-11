//states:
//1:init game draw boards
//2:white move
//3:black move
//4:white win
//5:black win
var state = 1;

function gotoState2(){
	drawBoard();
	appendClick();
	$("#status").html("Waiting on White.");
	state = 2;
}

function gotoState4(){
	drawBoard();
	appendClick();
	$("#status").html("Waiting on White.");
	state = 2;
}