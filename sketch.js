
var mario;
var marioimg;
var ground;
var rand;
var i;
var g;
var s;
var bg;
var brick,coin,bimg;
var brickg;
var coing;
var Score = 0;
var GameState = "play";
var enemyg;
var gameOverimg;
var end1;
var playsound;

function preload(){
  end1 = loadImage("images/end1.png")
  bg = loadImage("images/bg.jpg")
  marioimg = loadAnimation("images/img1.png","images/img2.png","images/img3.png","images/img4.png","images/img5.png")
bimg = loadImage("images/brick1.png")
gameOverimg = loadImage("images/game.jpg");
i = loadAnimation("images/obs1.png")
j = loadAnimation("images/obs2.png")
k = loadAnimation("images/obs3.png")
playsound = loadSound("play sound.mp3")
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background = createSprite(width/2,height/2,width,height);
  background.scale = 0.55;
  background.addImage(bg);
  mario = createSprite(40,height/2,10,10);
  mario.scale = 2
  mario.addAnimation("mario_img",marioimg)
  ground = createSprite(width/2,height-8,width,30)
  ground.visible = false;
  edges = createEdgeSprites();
  brickg = new Group();
  coing = new Group();
  enemyg = new Group();
}
 


function draw() {
 
 

if(GameState === "play"){
 //playsound.play();
mario.bounceOff(edges[2])
 background.velocityX = -3;

 if(background.x < width/2 ){
  background.x = background.width/2
}
console.log(mario.y);
  rand = random(-35,-10)
  
  if(keyDown("space") && mario.y >= 541.8){
    mario.velocityY = rand;
    //mario.velocityX = 3;
  }
 mario.velocityY = mario.velocityY + 0.8 ;
  mario.collide(ground);
 for(var i = 0; i < brickg.length;i++){
   if(brickg.get(i).isTouching(mario)){
   brickg.get(i).destroy();
   //coin.velocityY(-1)
  coin(); //coing.get(i).visible = true;()
  Score = Score+1
    }
  }
    for(var i = 0; i < enemyg.length;i++){
      if(enemyg.get(i).isTouching(mario)){
       mario.destroy();
        GameState = "end";
      }
    }
   


   
  Enemy();
  bricks();

}
if(GameState === "end"){
  //background = createSprite(width/2,height/2,width,height);
  //background.addImage(gameOverimg);
  //background.scale = 3;
  background.velocityX = 0;
  enemyg.destroyEach();
  coing.destroyEach();
  brickg.destroyEach();
  mario = createSprite(40,height-30,10,10);
  mario.addAnimation("mario_img",end1)
  text("GameOver",width/2,height/2);
  
 
}

  
  drawSprites();
  fill(0);
  stroke("white");
  strokeWeight(7);
  textSize(30);
  text("Score:"+Score,width/2+500,35);

  
}

function Enemy(){
  if(frameCount % 20 === 0){
  var obst = createSprite(width,height-70);
  obst.velocityX = -3;
  
  var rand =  Math.round(random(1,3));
  switch(rand){
    case 1: obst.addAnimation("obstacle",i)
    break;
    case 2: obst.addAnimation("obstacle",j)
    break;
    case 3: obst.addAnimation("obstacle",k)
  default:break
  }
    
  console.log(obst.x);
  enemyg.add(obst);

}
}
function coin (){
  var coin = createSprite(30,20,30,30);
  coing.add(coin);
  coin.velocityY = -3;
}
function bricks (){
  if(frameCount % 100 === 0){
    
  var brick  = createSprite(width,Math.round 
(random(200,height-200),120,10));
brick.addImage(bimg);
  brick.velocityX = -3;
  brickg.add(brick);
    //obst.addAnimation("obstacle",i)
  //console.log(obst.x);
  }
}
