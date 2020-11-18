//Create variables here
var dog;
var database;
var foodS = 10;
var foodStock;
var sad, happy;
var feed;
var lastFed, fedTime;
var foodObj;

function preload(){
   sad = loadImage("images/Dog.png");
   happy = loadImage("images/happydog.png");
}

function setup() {
	database = firebase.database();
	
	foodStock = database.ref('Food');
	foodStock.on("value",readStock);

		createCanvas(1000, 500);

		foodObj = new Food();

		dog = createSprite(800, 200, 150, 150);
		dog.addImage(sad);
		dog.scale = 0.15;
		
		feed = createButton("Feed the dog");
		feed.position(675, 135);
		feed.mousePressed(feedDog);

		addFood = createButton("Add Food");
		addFood.position(775, 135);
		addFood.mousePressed(addFoods);

		lastFed = hour();
}


function draw() {  
	
		background(46, 139, 87);
		fedTime = database.ref('time')

		foodObj.display();

		fill(255,255,254);
		textSize(15);
		if(lastFed >= 12){
			text("Last Feed : " + lastFed % 12 + " PM", 450, 50);
		}
		else if(lastFed == 0){
			text("Last Feed : 12 AM", 450, 30);
		}
		else{
			text("Last Feed : " + lastFed + " AM", 450, 50);
		}
		
		text("Press 'Add Food' to add stock of food", 370, 470);
		text("Press 'Feed the dog' to feed dog", 372, 490);


	

	drawSprites();
 
}

function addFoods(){
	foodS++

	database.ref('/').set({
	  	Food: foodS
	});

}

function feedDog(){
	dog.addImage(happy);
  
	foodObj.updateFoodStock(foodObj.getFoodStock() - 1);

	database.ref('/').update({
		time: lastFed,
		Food: foodObj.getFoodStock()
	})
}

function readStock(data){
	foodS = data.val();
	foodObj.updateFoodStock(foodS);
}