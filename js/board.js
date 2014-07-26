var gridCount = 14;
var gridWidth = 20;
var canvasWidth = 400;

function drawBoard(){
	//graw grids
	var barLength = gridCount * gridWidth;
	var c=document.getElementById("board");
	var ctx=c.getContext("2d");
	ctx.translate(60,60);
	ctx.beginPath();
	for (i =0;i<=gridCount;i++){
		ctx.moveTo(0,i*gridWidth);
		ctx.lineTo(barLength,i*gridWidth);
		ctx.moveTo(i*gridWidth,0);
		ctx.lineTo(i*gridWidth,barLength);
	}
	ctx.stroke();
	
	//add margin text
	ctx.font="20px Georgia";
	ctx.textAlign="center";
	ctx.textBaseline="middle"; 
	
	var textL = 'a';
	var textN = 1;
	for (i =0;i<=gridCount;i++){
		ctx.fillText(textL,i*gridWidth, -30); 
		textL = String.fromCharCode(textL.charCodeAt(0) + 1);
		ctx.fillText(textN, -30, i*gridWidth); 
		textN ++;
	}
	
	//add small rects
	ctx.fillRect(137,137,6,6);
	ctx.fillRect(57,57,6,6);
	ctx.fillRect(217,57,6,6);
	ctx.fillRect(57,217,6,6);
	ctx.fillRect(217,217,6,6);
}