var dog,dogImg,dogImg1; 
var database; 
var foodS,foodStock; 
var fedTime, lastFed;
var petButton, foodButton;
var foodObject;

function preload(){ 
  dogImg=loadImage("Dog (1).png"); 
  dogImg1=loadImage("happy dog(1).png"); 
} 
//Function to set initial environment 
function setup() { 

  var object;

  petButton = createButton("Pet");
  petButton.position(700,95);
  petButton.mousePressed(feedDog);

  foodButton = createButton("Food");
  foodButton.position(800,95);
  foodButton.mousePressed(addFoods);
  database=firebase.database(); 
  
  createCanvas(500,500); 
  
  dog=createSprite(250,300,150,150); 
  dog.addImage(dogImg); dog.scale=0.15; 
  
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
  textSize(20); 
} 
  
  // function to display UI 
  function draw() { 
    background(46,139,87); 
    
    fill(255,255,254);
    if(lastFed>=12){
      text("Last Feed:" + lastFed%12 + "PM",350, 30);
    } else if(lastFed==0){
      text("Last Feed: 12 AM",350,30);
    } else if(lastFed==0){
      text("Last Fed:" + lastFed + "AM",350 ,30);
    }
    drawSprites(); 
    
    fill(255,255,254); 
    stroke("black"); 
    text("Food remaining : "+foodS,170,200); 
    textSize(13); text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20); 

    food.display();
  
  } 
  
  //Function to read values from DB 
  function readStock(data){ 
    foodS=data.val(); 
  } 
  
  //Function to write values in DB 
  function writeStock(x){ 
    if(x<=0){ 
      x=0; 
    } else{ 
      x=x-1;
    } 
    database.ref('/').update({ Food:x }) 
  }
