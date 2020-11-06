var me = true;
var over = false;
var chessBox = [];
 

var myWin = [];
var computerWin = [];

var wins = []; 
for(i=0;i<15;i++){
 chessBox[i]=[];
 for(j=0;j<15;j++){
 chessBox[i][j]=0;
 } 
}
for(var i=0;i<15;i++){
 wins[i]=[];
 for(var j=0;j<15;j++){
 wins[i][j]=[];
 }
}
var count =0;

for(var i=0;i<15;i++){
 for(var j=0;j<11;j++){
 for(var k=0; k<5;k++){
 wins[i][j+k][count] = true;
 }
 count++;
 }
}

for(var i=0;i<15;i++){
 for(var j=0;j<11;j++){
 for(var k=0; k<5;k++){
 wins[j+k][i][count] = true;
 }
 count++;
 }
}

for(var i=0;i<11;i++){
 for(var j=0;j<11;j++){
 for(var k=0; k<5;k++){
 wins[i+k][j+k][count] = true;
 }
 count++;
 }
}

for(var i=0;i<11;i++){
 for(var j=14;j>3;j--){
 for(var k=0; k<5;k++){
 wins[i+k][j-k][count] = true;
 }
 count++;
 }
}
  
console.log(count);
for (var i=0;i<count;i++) {
 myWin[i] = 0;
 computerWin[i] = 0;
}

  

  

var oneStep = function(i,j,me){
 context.beginPath();
 context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
 context.closePath();
 var color;
 if(me){
	color="black";
}else{
	color="white";
}
  
 context.fillStyle = color;
 context.fill();
}
  
chess.onclick = function(e){
 if(over){
 return;
 }
 if(!me){
 return;
 }
 var x = e.offsetX;
 var y = e.offsetY;
 var i = Math.floor(x/30); 
 var j = Math.floor(y/30);
 if(chessBox[i][j]==0){
 oneStep(i,j,me);
  
 chessBox[i][j]=1;
  
  
 for(var k=0;k < count; k++){
 if(wins[i][j][k]) {
 myWin[k]++;
 computerWin[k] = 6; 
 if(myWin[k] == 5) {
 window.alert("You Win!");
 over = true;
 }
 }
 }
 if(!over){
 me=!me;
 computerAI();
 }
}
  



}
var computerAI = function(){
 var myScore = [];
 var computerScore = [];
 var max = 0; 
 var u = 0, v =0; 
 for(var i=0;i<15;i++){
 myScore[i] = [];
 computerScore [i] = [];
 for(var j=0;j<15;j++){
 myScore[i][j] = 0;
 computerScore[i][j] = 0;
 }
 }
 for (var i=0; i<15;i++) {
 for (var j=0;j<15;j++) {
 if(chessBox[i][j] == 0){
 for(var k =0 ;k<count;k++){
 if(wins[i][j][k]){
 if(myWin[k]==1){
 myScore[i][j]+= 200;
 }else if(myWin[k]==2){
 myScore[i][j]+= 400;
 }else if(myWin[k]==3){
 myScore[i][j]+= 2000;
 }else if(myWin[k]==4){
 myScore[i][j]+= 10000;
 }
 if(computerWin[k]==1){
 computerScore[i][j]+= 220;
 }else if(computerWin[k]==2){
 computerScore[i][j]+= 420;
 }else if(computerWin[k]==3){
 computerScore[i][j]+= 2020;
 }else if(computerWin[k]==4){
 computerScore[i][j]+= 10020;
 }
 }
 }
 if(myScore[i][j]>max){
 max = myScore[i][j];
 u = i;
 v = j;
 }else if(myScore[i][j] == max){
 if(computerScore[i][j] > computerScore[u][v]){
 u = i;
 v = j;
 }
 }
 if(computerScore[i][j]>max){
 max = computerScore[i][j];
 u = i;
 v = j;
 }else if(computerScore[i][j] == max){
 if(myScore[i][j] > myScore[u][v]){
 u = i;
 v = j;
 }
 }
 }
 }
 }
 oneStep(u,v,false);
 chessBox[u][v] = 2;
 for(var k=0;k < count; k++){
 if(wins[u][v][k]) {
 computerWin[k]++;
 myWin[k] = 6; 
 if(computerWin[k] == 5) {
 window.alert("Computer Win!");
 over = true;
 }
 }
 }
 if(!over){
 me=!me; 
 }
}
function rst(){
	window.location.reload();
}