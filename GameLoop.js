let ingame;
let settingspage;

let exitSave;

let statsAdded;
let solveIsAdded;
let resultsCalculated;
let hsChanged;

let myGraph;

function draw(){
  if (settingspage){
    myGraphics.drawSettings(); 
  }
  else
    if (ingame){ 
      if (!myStats.keyboard){
        checkHover();
      }
      ingame = !checkIfLose();
      gameThings();  
      myGraphics.textThings();      
   }
    else{ 
      if (!myGraphics.gameOverDrawn){
        lastMove=""
        exitSave = true;   //you can exit session once if youre just lose
        background(51);
        text('Solving, please wait...', 400, 400);
        gameSetup(exitSave); 
      }
    }
}

//resettype - true - WIN, false - reset the game (no avreages)
function gameSetup(resettype){
  print("reseting")
  if (!resettype){
    deleteStatsTable();
    addStatsInLog();
    nullSolveInfo();
  }
  myGraphics.nullGraphFlags();
  myStats.nullStatsFlags();
  nullAroundFlags();
  nullGame();
  exitSave = false; //you can't change something and save session
  ingame = true; 
  settingspage = false;
}
