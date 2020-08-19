var trex, trex_running, trex_collided, cloudImage, restartImage, gameOverImage;
var ground, invisibleGround, groundImage, Cloudsgroup, Obstaclesgroup, ob1Image, ob2Image, ob3Image, ob4Image, ob5Image, ob6Image, gameState, score, restart, gameOver, jump, die, check;

var PlAY, END;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1Image = loadImage("obstacle1.png");
  ob2Image = loadImage("obstacle2.png");
  ob3Image = loadImage("obstacle3.png");
  ob4Image = loadImage("obstacle4.png");
  ob5Image = loadImage("obstacle5.png");
  ob6Image = loadImage("obstacle6.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  jump=loadSound("jump.mp3");
  check=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  Cloudsgroup = createGroup();
  Obstaclesgroup = createGroup();
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  gameOver=createSprite(300,80,20,20);
  gameOver.scale=0.8;
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  restart=createSprite(300,120,10,10);
  restart.scale=0.6;
  restart.addImage(restartImage);
  restart.visible=false;
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  score=0;
}

function draw() {
  background(255);
  textFont("Impact");
  textSize(18);
  text("Score: "+score, 500,50);
  
  if (gameState === PLAY) {

    score=score+Math.round(getFrameRate()/60);
    
    if (keyDown("space") && trex.y > 161) {
      trex.velocityY = -12;
      jump.play();
    }

    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -(6+Math.round(3*score/100));
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnClouds();
    spawnObstacles();
  if(score%100===0&&score>0){
    check.play();
  }
  if (Obstaclesgroup.isTouching(trex)) {
    gameState = END;
    die.play();
  }
} else if (gameState === END) {
  gameOver.visible=true; 
  restart.visible=true; 
  ground.velocityX = 0;
  Obstaclesgroup.setVelocityXEach(0);
  Cloudsgroup.setVelocityXEach(0);
  trex.setVelocity(0, 0);
  trex.changeAnimation("collided");
  Obstaclesgroup.setLifetimeEach(-1);
  Cloudsgroup.setLifetimeEach(-1);
  if(mousePressedOver(restart)){
     reset();
}
}
trex.collide(invisibleGround);
drawSprites();
}

function spawnClouds() {
  if (frameCount % 90 === 0) {
    cloud = createSprite(600, Math.round(random(80, 120)), 20, 50);
    cloud.addImage(cloudImage);
    cloud.velocityX = -3;
    cloud.lifetime = 210;
    cloud.scale = 0.7;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    Cloudsgroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 70 === 0) {
    var obstacle = createSprite(Math.round(random(600, 700)), 165, 10, 10);
    // obstacle.velocityX = -(6 + Math.round(count / 100));
    obstacle.velocityX = -(6+Math.round(3*score/100));
    var x = Math.round(random(1, 6));
    switch (x) {
      case 1:
        obstacle.addImage(ob1Image);
        break;
      case 2:
        obstacle.addImage(ob2Image);
        break;
      case 3:
        obstacle.addImage(ob3Image);
        break;
      case 4:
        obstacle.addImage(ob4Image);
        break;
      case 5:
        obstacle.addImage(ob5Image);
        break;
      case 6:
        obstacle.addImage(ob6Image);
        break;
    }
    obstacle.scale = 0.5;
    Obstaclesgroup.add(obstacle);
    obstacle.lifetime = 110;
  }
}
function reset(){
  gameState=PLAY;
  Obstaclesgroup.destroyEach();
  Cloudsgroup.destroyEach();
  trex.changeAnimation("running");
  score=0;
  restart.visible=false;
  gameOver.visible=false;
}