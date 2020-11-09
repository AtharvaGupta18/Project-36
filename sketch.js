//Create variables here
var dog;
var database;
var stock,foodStock;
var dog1, dog2;

function preload(){
   dog1 = loadImage("images/Dog.png");
   dog2 = loadImage("images/happydog.png");
}

function setup() {
	database = firebase.database();
	createCanvas(500, 500);

	dog = createSprite(250, 250, 150, 150);
  	dog.addImage(dog1);
  	dog.scale = 0.3;

	foodStock = database.ref('Milk');
	foodStock.on("value", readStock);

}


function draw() {  
	background(46, 139, 87)
	//add styles here

	if(keyWentDown(UP_ARROW)){
		writeStock(stock);
		dog.addImage(dog2);
	}

	drawSprites();
	fill("black");
  	stroke("black");
  	text("Food remaining : "+stock, 170, 100);
  	textSize(20);
  	text("Note: Press 'up arrow key' to feed dog milk!",130, 10, 300, 20);
}

function readStock(data){

	stock = data.val();

}

function writeStock(x){
	if(x <= 0){
		x = 0;

	}else{
		x = x - 1;
	} 
	database.ref('/').update({
		Milk: x
	});
}

