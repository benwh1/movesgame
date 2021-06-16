class GameGraphics extends Graphic_tools {
  sizeChange(){
    super.sizeChange();
    this.tileSize = this.boardSize/myStats.N;
    this.tileTextSize = this.tileSize/1.9;
    this.zero = (this.W-this.boardSize)/2;
    
  }
  
  
   
  //draw tile with number num, position x, y, where x and y are 0..N-1 positions, not the exact coordinats
  drawTile(num, x, y,tileColor){
    let exactX = this.zero + this.tileSize*x;
    let exactY = this.zero + this.tileSize*y;
    /*
    if (num != 1){
      fill(cc("tileColor", 240));      
    }
    else{
      fill(255,0,0);
    }*/
    //print(tileColor);
  
    fill(tileColors[tileColor]); 

  
    strokeWeight(0);
    rect(exactX,exactY,this.tileSize,this.tileSize, cornersConst);
    strokeWeight(0.1);
    fill(cc("tileText",230)); 
    text(num, exactX+this.tileSize/2, exactY+this.tileSize/2);
  }
  
  drawSettings(){
    super.drawSettings();
    let nCounter = 3;
    let modeCounter = "Keyboard";
    let posCounter = 19;
    fill(cc("lightStats")); 
    textSize(27);
    this.drawLine(["Keyboard (" + myStats.typeName + ")"], 21, true);
    fill(cc("headers")); 
    this.drawLine(["Size"].concat(myStats.myAvgs), 20, true);
    let resAr = [];
    while (nCounter < 8){
      fill(cc("statsText")); 
      resAr = [];
      resAr.length = 0;
      resAr.push(nCounter + "x" + nCounter);
      myStats.myAvgs.forEach(function(avg){
        resAr.push(myStats.lHighScore(myStats.typeName, modeCounter, nCounter, avg))
      });
      fill(getRangeColor(3, 7, nCounter, true, 170));
      this.drawLine(resAr,
               posCounter,
               false);
      posCounter--;
      nCounter++;
      if (nCounter == 8){
        if (modeCounter != "Mouse"){
          modeCounter = "Mouse";
          fill(cc("origStats")); 
          this.drawLine(["Mouse (" + myStats.typeName + ")"], posCounter, true);
          posCounter--;
          fill(cc("headers")); 
          this.drawLine(["Size"].concat(myStats.myAvgs), posCounter, true);
          posCounter--;
          nCounter = 3;
        }
      }
    }
    fill(cc("helpers")); 
    this.drawLine(["[R] to show other type","[H] to reset HighScores"],
             posCounter,false);  
    }
  
  textThings(){
    super.textThings();
    fill(cc("helpers", this.alpha));
    
    textSize(20);
    text("[SpaceBar] to Reset | [M] to change mode | [V] to hide things",this.W/2, this.W-this.W/9);
    textSize(50);
    fill(0,255,0);
    
    text(goodCounter,this.W/2-this.W/8, this.W/9);
     textSize(25);
    text((goodCounter*100/totalCounter).toFixed(2)+"%",this.W/2, this.W/13);
    textSize(50);
    fill(255,255,255);
    text(totalCounter,this.W/2+this.W/8, this.W/9);
    textSize(15);
    fill(cc("tileColor", this.alpha));
    text("Current mode: "+myStats.modeName + " (M to change)", this.W/2, this.W-this.W/35)
    textSize(25);
    
    let N = myStats.N;
    textSize(50);
    let colorthing=(N-2);
    let maxColor = int(26*colorthing*colorthing-12*colorthing);
    fill(getRangeColor(0,maxColor,movecount, true, this.alpha));

    textAlign(CENTER,CENTER);
    textFont('Helvetica'); 
   // noStroke();
    
    textAlign(CENTER,CENTER);
    textSize(this.tileTextSize); 
    textStyle(NORMAL);

    for (let i = 1; i <= N*N; i++) {
      if (randomNumbers[i-1] != N*N){
        let x = linToX(i);
        let y = linToY(i);
        let colorId=tileColorsIndex[N-3][randomNumbers[i-1]-1];
        try{
        this.drawTile(randomNumbers[i-1],x,y,colorId);
        }catch(error){
          print([randomNumbers,randomNumbers[i-1], N, i,x,y,tileColorsIndex[N-3][randomNumbers[i-1]-1]]);
        }
      }
    }  
  }
  
  
  gameOverText(){
    textSize(55);
    background(0,0,0)
    fill(cc("gameOver"));  
  }
}

