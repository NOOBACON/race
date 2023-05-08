var Player, box, CAVALO, P=2, gameState, PLAY=1, END=0, path, pathImg, PlayerImg, boxImg, boxG, gameOver;

function preload(){
   PlayerImg = loadAnimation("doll1.png","doll3.png","doll4.png","doll6.png","doll4.png","doll2.png");
    pathImg = loadImage("path.png");
    boxImg = loadImage("box.png");
    gameOver = loadAnimation("skull1.png","skull2.png","skull3.png","skull4.png","skull5.png","skull4.png","skull3.png","skull2.png");
}

function setup() {
    createCanvas(600,600);
    path = createSprite(300, 300, 600, 600)
    path.addImage(pathImg);
    path.scale=0.45
    CAVALO = createSprite(300,40,20,20);
    Player = createSprite(300, 550, 40 ,40);
    gameState = PLAY;
    Player.addAnimation("Run", PlayerImg)
    Player.addAnimation("gameOver", gameOver);
    Player.scale=0.2
    boxG = createGroup();
}

function draw() {
    background ("lightBlue");
    if (gameState===PLAY){
        if(keyDown("1")){
            P=1;
        }
        if(keyDown("2")){
            P=2;
        }
        if(keyDown("3")){
            P=3;
        }
        if(frameCount % 100 === 0){
            spawnBox();
        }
        CAVALO.x=(P*200)-100;
    }
    
    if(boxG.isTouching(Player)){
        gameState=END;
        boxG.setVelocityYEach(0);
        boxG.destroyEach();
        Player.changeAnimation("gameOver",gameOver);
        CAVALO.x=Player.x;
    }
    
    Player.velocityX=(CAVALO.x-Player.x)/7; 
    CAVALO.visible=false;
    drawSprites();

   

}
function spawnBox(){
    box = createSprite(((Math.round(random(1,3))*200)-100), -50, 200, 200);
    box.addAnimation("box", boxImg);
    box.scale=0.125
    box.velocityY = 7;
    box.setCollider("rectangle", 0, 0, box.width, box.height);
    box.debug=true;
    boxG.add(box);
    
}