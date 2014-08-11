var gridCount = 14;
var gridWidth = 20;

//draw grids, margin text and square marker
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

//draw black and white piece
//x and y are [0, 14]
//player can be 1 or 2.
function drawPiece(x, y, player){
	var radius = 7;
	var c=document.getElementById("board");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.arc(x*gridWidth, y*gridWidth, radius, 0, 2 * Math.PI, false);
	if (player == 2){
		ctx.fillStyle = 'black';
		ctx.fill();
	}
	ctx.strokeStyle = '#000000';
	ctx.stroke();
}

function appendClick(){
	$("#board").on("click", function(e){
		var x = Math.floor((e.pageX-$("#board").offset().left-60+gridWidth/2) / gridWidth);
		var y = Math.floor((e.pageY-$("#board").offset().top-60+gridWidth/2) / gridWidth);
		console.log(x,y);
		if(state == 2){
			if(boardMatrix[x][y][0]==0){
				drawPiece(x,y,1);
				if(updateBoradMatrix(x, y, 1) == 2){
					changeAlert(2);
					gameEnd = 1;
				}
				else{
					player = 2;
					changeAlert(1);
				}
			}
		}
		else{
			if(boardMatrix[x][y][0]==0){
				drawPiece(x,y,2);
				if(updateBoradMatrix(x, y, 2) == 2){
					changeAlert(3);
					gameEnd = 1;
				}
				else{
					player = 1;
					changeAlert(0);
				}
			}
		}
	});
}


function removeClick(){
	$("#board").click(function(e){
	});
}

