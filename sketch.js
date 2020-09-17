var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bagimg, banaimg,monkey,bananan,obbyimg,obby
var monkeyimg
var bag

var score=0;


function preload() {
bagimg = loadImage("jungle.jpg");
monkeyimg= loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
banaimg = loadImage("banana.png");
  
obbyimg = loadImage("stone.png");
}
function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(50,180,20,50);
  
  
  monkey.addAnimation("running",monkeyimg);
  monkey.scale = 0.04;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obbyGroup = new Group();
  banananGroup = new Group();
  
  score = 0;
}

function draw() {
  background(bagimg);
  
  stroke("white"); textSize(20); fill("white"); 
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyDown("space") && monkey.y >= 140) {
      monkey.velocityY = -15;
    }
    
  if(banananGroup.isTouching(monkey)){
    banananGroup.destroyEach();  
        score = score+2;
  }
    monkey.velocityY = monkey.velocityY + 0.8
  
    
    
    switch(score){
    case 100:monkey.scale=0.06;
        break;
    case 200:monkey.scale=0.08;
        break;     
    case 300:monkey.scale=0.1;
        break;     
    case 400:monkey.scale=0.12;
        break;      
    case 500:monkey.scale=0.14;
        break;          
    default:break;
    }
  
    monkey.collide(invisibleGround);
    spawnObstacles();
    spawnbana();
    
  if(obbyGroup.isTouching(monkey)){
        gameState = END;
    
    }
    
   }
  else if (gameState === END) {
    
    
 
    invisibleGround.velocityX = 0;
    monkey.velocityY = 0;
    obbyGroup.setVelocityXEach(0);
    banananGroup.setVelocityXEach(0);
 
 
    obbyGroup.setLifetimeEach(-1);
    banananGroup.setLifetimeEach(-1);
    
    
    }
  drawSprites();
  }
  
  
  



function spawnbana() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) { 
    var bana = createSprite(600,120,40,10); 
    bana.y = Math.round(random(80,120));
    bana.addImage(banaimg);
    bana.scale = 0.05;
    bana.velocityX = -(6 + 3*score/100);
    
    bana.lifetime = 200;
 
    bana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    banananGroup.add(bana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.addImage(obbyimg);
    obstacle.velocityX = -(7 + 3*score/100);       
    obstacle.scale = 0.08;
    obstacle.lifetime = 300;
    obbyGroup.add(obstacle);
  }
}