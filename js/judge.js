// a local copy of board status
// index 0
	// 0 untaken
	// 1 taken by player 1
	// 2 taken by player 2
	//board: 20 by 20
var boardMatrix = new Array();
for(var i=0; i<gridCount; i++) {
    boardMatrix[i] = new Array();
    for(var j=0; j<gridCount; j++) {
        boardMatrix[i][j] = new Array();
		for(var k=0; k<5; k++)
			boardMatrix[i][j][k] = 0; //set all to 0
    }
}

//returns -1 place taken  
// 2 wins
// 1 continue
// goal: maintain the end-point of 'combos'. Use current point for winner detection

// todo: boundary checking on edges->done
function updateBoradMatrix(x, y, player){
	if(boardMatrix[x][y][0]!=0)
		return -1;
	else{
		boardMatrix[x][y][0] = player;
		boardMatrix[x][y][1] = 1;
		boardMatrix[x][y][2] = 1;
		boardMatrix[x][y][3] = 1;
		boardMatrix[x][y][4] = 1;
		if(x!=0 && y!=0 && boardMatrix[x-1][y-1][0] == player){
			if(x!=gridEdge&&y!=gridEdge&&boardMatrix[x+1][y+1][0] == player){
				counter1 = boardMatrix[x-1][y-1][1];
				counter2 = boardMatrix[x+1][y+1][1];
				counter3 = counter1 + counter2 + 1;
				boardMatrix[x-counter1][y-counter1][1] = counter3;
				boardMatrix[x+counter2][y+counter2][1] = counter3;
				boardMatrix[x][y][1] = counter3;				
			}
			else{
				counter1 = boardMatrix[x-1][y-1][1];
				boardMatrix[x-counter1][y-counter1][1] = counter1 + 1;
				boardMatrix[x][y][1] = counter1 + 1;
			}
		}
		if(y!=0&&boardMatrix[x][y-1][0] == player){
			if(y!=gridEdge&&boardMatrix[x][y+1][0] == player){
				counter1 = boardMatrix[x][y-1][2];
				counter2 = boardMatrix[x][y+1][2];
				counter3 = counter1 + counter2 + 1;
				boardMatrix[x][y-counter1][2] = counter3;
				boardMatrix[x][y+counter2][2] = counter3;
				boardMatrix[x][y][2] = counter3;				
			}
			else{			
				counter1 = boardMatrix[x][y-1][2];
				boardMatrix[x][y-counter1][2] = counter1 + 1;
				boardMatrix[x][y][2] = counter1 + 1;
			}
		}
		if(x!=gridEdge&&y!=0&&boardMatrix[x+1][y-1][0] == player){
			if(x!=0&&y!=gridEdge&&boardMatrix[x-1][y+1][0] == player){
				counter1 = boardMatrix[x+1][y-1][3];
				counter2 = boardMatrix[x-1][y+1][3];
				counter3 = counter1 + counter2 + 1;
				boardMatrix[x+counter1][y-counter1][3] = counter3;
				boardMatrix[x-counter2][y+counter2][3] = counter3;
				boardMatrix[x][y][3] = counter3;				
			}
			else{			
				counter1 = boardMatrix[x+1][y-1][3];
				boardMatrix[x+counter1][y-counter1][3] = counter1 + 1;
				boardMatrix[x][y][3] = counter1 + 1;
			}
		}
		if(x!=gridEdge&&boardMatrix[x+1][y][0] == player){
			if(x!=0&&boardMatrix[x-1][y][0] == player){
				counter1 = boardMatrix[x+1][y][4];
				counter2 = boardMatrix[x-1][y][4];
				counter3 = counter1 + counter2 + 1;
				boardMatrix[x+counter1][y][4] = counter3;
				boardMatrix[x-counter2][y][4] = counter3;
				boardMatrix[x][y][4] = counter3;				
			}
			else{			
				counter1 = boardMatrix[x+1][y][4];
				boardMatrix[x+counter1][y][4] = counter1 + 1;
				boardMatrix[x][y][4] = counter1 + 1;
			}
		}
		if(x!=0&&y!=gridEdge&&boardMatrix[x-1][y+1][0] == player){
			if(x==gridEdge||y==0||(x!=gridEdge&&y!=0&&boardMatrix[x+1][y-1][0] != player)){
				counter1 = boardMatrix[x-1][y+1][3];
				boardMatrix[x-counter1][y+counter1][3] = counter1 + 1;
				boardMatrix[x][y][3] = counter1 + 1;
			}
		}
		if(y!=gridEdge&&boardMatrix[x][y+1][0] == player){
			if(y==0||(y!=0&&boardMatrix[x][y-1][0] != player)){
				counter1 = boardMatrix[x][y+1][2];
				boardMatrix[x][y+counter1][2] = counter1 + 1;
				boardMatrix[x][y][2] = counter1 + 1;
			}
		}
		if(x!=gridEdge&&y!=gridEdge&&boardMatrix[x+1][y+1][0] == player){
			if(x==0||y==0||(x!=0&&y!=0&&boardMatrix[x-1][y-1][0] != player)){
				counter1 = boardMatrix[x+1][y+1][1];
				boardMatrix[x+counter1][y+counter1][1] = counter1 + 1;
				boardMatrix[x][y][1] = counter1 + 1;
			}
		}
		if(x!=0&&boardMatrix[x-1][y][0] == player){
			if(x==gridEdge||(x!=gridEdge&&boardMatrix[x+1][y][0] != player)){
				counter1 = boardMatrix[x-1][y][4];
				boardMatrix[x-counter1][y][4] = counter1 + 1;
				boardMatrix[x][y][4] = counter1 + 1;
			}
		}
		//console.log(boardMatrix[x][y]);
		for(var k=1; k<5; k++)
			if(boardMatrix[x][y][k] >= 5)
				return 2;
	}
	return 1;
}