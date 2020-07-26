/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var clouds;
var mountains;
var trees_x;
var trees_y;
var canyons;
var collectable;


var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    isJumping = false;
    
   

	// Initialise arrays of scenery objects.
        
        //Canion
    canyons = [
        {x_pos: 90, y_pos: 550, width: 100},
        {x_pos: 1000, y_pos: 550, width: 100},
        {x_pos: 3200, y_pos: 550, width: 100},
    ];
    
    
        //trees
    trees_x = [200, 330, 600, 900, 1400, 1550, 1700, 2000, 2600, 2500, 2900, 3000];
    trees_y = 350;
    
    
        //clouds
    clouds = [
        {x_pos: 20, y_pos: 200,size: 60,},
        {x_pos: 600, y_pos: 100,size: 60,},
        {x_pos: 800, y_pos: 200,size: 60,},
        {x_pos: 1020, y_pos: 200,size: 60,},
        {x_pos: 1600, y_pos: 100,size: 60,},
        {x_pos: 1800, y_pos: 200,size: 60,},
        {x_pos: 2020, y_pos: 200,size: 60,},
        {x_pos: 2600, y_pos: 100,size: 60,},
        {x_pos: 2800, y_pos: 200,size: 60,},
    ];
    
        //Mountains
    mountains = [ 
        {x_pos: 250},
        {x_pos: 600},
        {x_pos: 1250},
        {x_pos: 1800},
        {x_pos: 2250},
        {x_pos: 2800},
    ];
    

        //collectable
    collectables = [
        {x_pos: 10, y_pos: 415, size: 30, isFound: false},
        {x_pos: 930, y_pos: 415, size: 30, isFound: false},
        {x_pos: 1500, y_pos: 415, size: 30, isFound: false},
        {x_pos: 3000, y_pos: 415, size: 30, isFound: false},
    ];
        


}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    push();
    translate(scrollPos, 0);

    // Draw canyons.  //they have to be more in the background.
    
    for(var i=0; i < canyons.length; i++)
        {
            drawCanyon(canyons[i]);
            checkCanyon(canyons[i]);
        }
    
    // Draw clouds.
    drawClouds();
    
	// Draw mountains.
    drawMountains();

	// Draw trees.
    drawTrees();



	// Draw collectable items.
       for(var i=0; i < collectables.length; i++)
        {
            
            if(collectables[i].isFound == false){
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
            }
        }
    
    
    
    pop();


	// Draw game character.
	
	drawGameChar();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.    
    if(isJumping == true){
        if(gameChar_y == floorPos_y){
            gameChar_y -= 100;
        }
    }

    // gravity
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 2;
        isFalling = true;            
    } else{
        isFalling = false;
    }
  


	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){
    // if statements to control the animation of the character when

    if (keyCode == 37){
        isLeft = true;
    }
    
    if (keyCode == 39){
        isRight = true;
    }
    
    if (keyCode == 32){
        if (gameChar_y == floorPos_y){
            isJumping = true;
        }
        
    }
    

	console.log("press" + keyCode);
	console.log("press" + key);

}

function keyReleased()
{
    // if statements to control the animation of the character when

    if (keyCode == 37){
        isLeft = false;
    }
    
    if (keyCode == 39){
        isRight = false;
    }
    
    if (keyCode == 32){
         isJumping = false;
    }
    
	console.log("release" + keyCode);
	console.log("release" + key);

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    
	//the game character
	if((isLeft && isFalling) || (isLeft && isJumping) || (isLeft && isPlummeting))
	{
		// add your jumping-left code
        
    
        stroke(0);

        /*cabeza*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20);

        /*cara*/
        fill(255, 224, 195);
        beginShape();
            vertex(gameChar_x - 9, gameChar_y - 63);
            vertex(gameChar_x, gameChar_y - 60);
            vertex(gameChar_x - 9, gameChar_y - 57);
        endShape();

        /*ojos*/
        fill(0);
        ellipse(gameChar_x - 8, gameChar_y - 60, 1, 3);

        /*cuerpo*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 35, 8, 30);

        /*brazo*/

         rect(gameChar_x, gameChar_y - 45, 20, 2);


        /*mano*/
        fill(255, 224, 195);
        rect(gameChar_x + 20, gameChar_y - 45, 2, 2);


        /*pierna*/

        fill(0, 0, 100);

        beginShape();
            vertex(gameChar_x, gameChar_y - 20);
            vertex(gameChar_x -8, gameChar_y - 26);
            vertex(gameChar_x - 4, gameChar_y - 15);
            vertex(gameChar_x - 5, gameChar_y - 11);
            vertex(gameChar_x -12, gameChar_y - 32);
            vertex(gameChar_x + 2, gameChar_y - 22);

        endShape(CLOSE);


        /*pie*/
        fill(0);
        rect(gameChar_x - 7, gameChar_y -15, 2, 5);



	}
	else if((isRight && isFalling) || (isRight && isJumping) || (isRight && isPlummeting))
	{
		// add your jumping-right code
        
        stroke(0);

        /*cabeza*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20);

        /*cara*/
        fill(255, 224, 195);
        beginShape();
            vertex(gameChar_x + 9, gameChar_y - 63);
            vertex(gameChar_x, gameChar_y - 60);
            vertex(gameChar_x + 9, gameChar_y - 57);
        endShape();

        /*ojos*/
        fill(0);
        ellipse(gameChar_x + 8, gameChar_y - 60, 1, 3);

        /*cuerpo*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 35, 8, 30);

        /*brazo*/

         rect(gameChar_x, gameChar_y - 45, - 20, 2);


        /*mano*/
        fill(255, 224, 195);
        rect(gameChar_x - 22, gameChar_y - 45, 2, 2);


        /*pierna*/

        fill(0, 0, 100);

        beginShape();
            vertex(gameChar_x, gameChar_y - 20);
            vertex(gameChar_x + 8, gameChar_y - 26);
            vertex(gameChar_x + 4, gameChar_y - 15);
            vertex(gameChar_x + 5, gameChar_y - 11);
            vertex(gameChar_x +12, gameChar_y - 32);
            vertex(gameChar_x - 2, gameChar_y - 22);

        endShape(CLOSE);


        /*pie*/
        fill(0);
        rect(gameChar_x + 4, gameChar_y -15, 2, 5);




	}
	else if(isLeft)
	{
		// add your walking left code
        

        stroke(0);

        /*cabeza*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20);

        /*cara*/
        fill(255, 224, 195);
        beginShape();
            vertex(gameChar_x - 9, gameChar_y - 63);
            vertex(gameChar_x, gameChar_y - 60);
            vertex(gameChar_x - 9, gameChar_y - 57);
        endShape();

        /*ojos*/
        fill(0);
        ellipse(gameChar_x - 8, gameChar_y - 60, 1, 3);

        /*cuerpo*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 35, 8, 30);

        /*brazo*/

         rect(gameChar_x, gameChar_y - 45, 2, 20);


        /*mano*/
        fill(255, 224, 195);
        rect(gameChar_x, gameChar_y - 28, 2, 3);


        /*pierna*/
        fill(0, 0, 100);
        beginShape();
            vertex(gameChar_x - 2, gameChar_y - 22);
            vertex(gameChar_x, gameChar_y - 20);
            vertex(gameChar_x - 4, gameChar_y - 11);
            vertex(gameChar_x - 2, gameChar_y);
            vertex(gameChar_x - 4, gameChar_y);
            vertex(gameChar_x - 6, gameChar_y - 11);

        endShape(CLOSE);

        beginShape();
            vertex(gameChar_x + 2, gameChar_y - 22);
            vertex(gameChar_x, gameChar_y - 20);
            //vertex(gameChar_x - 2, gameChar_y - 11);
            vertex(gameChar_x + 2, gameChar_y);
            vertex(gameChar_x + 4, gameChar_y);
            //vertex(gameChar_x, gameChar_y - 11);
        endShape(CLOSE);

        /*pie*/
        fill(0);
        rect(gameChar_x - 1, gameChar_y, 5, 2);
        rect(gameChar_x - 8, gameChar_y, 5, 2);



	}
	else if(isRight)
	{
		// add your walking right code
        

        stroke(0);

        /*cabeza*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20);

        /*cara*/
        fill(255, 224, 195);
        beginShape();
            vertex(gameChar_x + 9, gameChar_y - 63);
            vertex(gameChar_x, gameChar_y - 60);
            vertex(gameChar_x + 9, gameChar_y - 57);
        endShape();

        /*ojos*/
        fill(0);
        ellipse(gameChar_x + 8, gameChar_y - 60, 1, 3);

        /*cuerpo*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 35, 8, 30);

        /*brazo*/

         rect(gameChar_x - 2, gameChar_y - 45, 2, 20);


        /*mano*/
        fill(255, 224, 195);
        rect(gameChar_x - 2, gameChar_y - 28, 2, 3);


        /*pierna*/
        fill(0, 0, 100);
        beginShape();
            vertex(gameChar_x + 2, gameChar_y - 22);
            vertex(gameChar_x, gameChar_y - 20);
            vertex(gameChar_x + 4, gameChar_y - 11);
            vertex(gameChar_x + 2, gameChar_y);
            vertex(gameChar_x + 4, gameChar_y);
            vertex(gameChar_x + 6, gameChar_y - 11);

        endShape(CLOSE);

        beginShape();
            vertex(gameChar_x - 2, gameChar_y - 22);
            vertex(gameChar_x, gameChar_y - 20);
            //vertex(gameChar_x - 2, gameChar_y - 11);
            vertex(gameChar_x - 2, gameChar_y);
            vertex(gameChar_x - 4, gameChar_y);
            //vertex(gameChar_x, gameChar_y - 11);
        endShape(CLOSE);

        /*pie*/
        fill(0);
        rect(gameChar_x + 2, gameChar_y, 5, 2);
        rect(gameChar_x - 5, gameChar_y, 5, 2);


	}
	else if(isFalling || isPlummeting || isJumping)
	{
		// add your jumping facing forwards code
        
        stroke(0);

        /*cabeza*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20);

        /*cara*/
        fill(255, 224, 195);
        ellipse(gameChar_x, gameChar_y - 60, 15, 6)
        /*ojos*/
        fill(0);
        ellipse(gameChar_x - 2.5, gameChar_y - 60, 1, 3);
        ellipse(gameChar_x + 2.5, gameChar_y - 60, 1, 3);

        /*cuerpo*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 35, 8, 30);

        /*brazo*/
        beginShape();
            vertex(gameChar_x - 3, gameChar_y - 46);
            vertex(gameChar_x - 15, gameChar_y - 40);  
            vertex(gameChar_x - 6, gameChar_y - 36);
            vertex(gameChar_x - 6, gameChar_y - 38);
            vertex(gameChar_x - 13, gameChar_y - 40);
            vertex(gameChar_x - 3, gameChar_y - 44);
        endShape(CLOSE);

         beginShape();
            vertex(gameChar_x + 3, gameChar_y - 46);
            vertex(gameChar_x + 15, gameChar_y - 40);  
            vertex(gameChar_x + 6, gameChar_y - 36);
            vertex(gameChar_x + 6, gameChar_y - 38);
            vertex(gameChar_x + 13, gameChar_y - 40);
            vertex(gameChar_x + 3, gameChar_y - 44);
        endShape(CLOSE);

        /*mano*/
        fill(255, 224, 195);
        rect(gameChar_x - 6, gameChar_y - 38.5, 2, 3);
       rect(gameChar_x + 3, gameChar_y - 38.5, 2, 3);

        /*pierna*/
        fill(0, 0, 100);
        rect(gameChar_x - 3, gameChar_y - 35, 2, 15);
        rect(gameChar_x, gameChar_y - 35, 2, 15);

        /*pie*/
        fill(0);
        rect(gameChar_x, gameChar_y - 20, 2, 5);
        rect(gameChar_x - 3, gameChar_y - 20, 2, 5);
    

        

	}
	else
	{
		// add your standing front facing code
        
                
        stroke(0);

        /*cabeza*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20);

        /*cara*/
        fill(255, 224, 195);
        ellipse(gameChar_x, gameChar_y - 60, 15, 6)
        /*ojos*/
        fill(0);
        ellipse(gameChar_x - 2.5, gameChar_y - 60, 1, 3);
        ellipse(gameChar_x + 2.5, gameChar_y - 60, 1, 3);

        /*cuerpo*/
        fill(0, 0, 100);
        ellipse(gameChar_x, gameChar_y - 35, 8, 30);

        /*brazo*/
        beginShape();
            vertex(gameChar_x - 3, gameChar_y - 46);
            vertex(gameChar_x - 15, gameChar_y - 40);  
            vertex(gameChar_x - 6, gameChar_y - 30);
            vertex(gameChar_x - 6, gameChar_y - 32);
            vertex(gameChar_x - 13, gameChar_y - 40);
            vertex(gameChar_x - 3, gameChar_y - 44);
        endShape(CLOSE);

         beginShape();
            vertex(gameChar_x + 3, gameChar_y - 46);
            vertex(gameChar_x + 15, gameChar_y - 40);  
            vertex(gameChar_x + 6, gameChar_y - 30);
            vertex(gameChar_x + 6, gameChar_y - 32);
            vertex(gameChar_x + 13, gameChar_y - 40);
            vertex(gameChar_x + 3, gameChar_y - 44);
        endShape(CLOSE);

        /*mano*/
        fill(255, 224, 195);
        rect(gameChar_x - 6, gameChar_y - 32, 2, 3);
       rect(gameChar_x + 3, gameChar_y - 32, 2, 3);

        /*pierna*/
        fill(0, 0, 100);
        beginShape();
            vertex(gameChar_x - 2, gameChar_y - 22);
            vertex(gameChar_x, gameChar_y - 20);
            vertex(gameChar_x - 2, gameChar_y);
            vertex(gameChar_x - 4, gameChar_y);

        endShape(CLOSE);

        beginShape();
            vertex(gameChar_x + 2, gameChar_y - 22);
            vertex(gameChar_x, gameChar_y - 20);
            vertex(gameChar_x + 2, gameChar_y);
            vertex(gameChar_x + 4, gameChar_y);
        endShape(CLOSE);

        /*pie*/
        fill(0);
        rect(gameChar_x + 2, gameChar_y, 5, 2);
        rect(gameChar_x - 8, gameChar_y, 5, 2);



	}


}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds(){
    for(var i=0; i < clouds.length; i++)
    {
        fill(255, 255, 255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size); 
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos + 20, clouds[i].size - 10);
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos + 5, clouds[i].size - 10);
        ellipse(clouds[i].x_pos +70, clouds[i].y_pos +20, clouds[i].size - 10);
        ellipse(clouds[i].x_pos +15, clouds[i].y_pos + 25, clouds[i].size + 40, clouds[i].size);
    }
}

// Function to draw mountains objects.
function drawMountains(){
    for(var i=0; i < mountains.length; i++)
    {
        fill(161, 81, 1);
        triangle(mountains[i].x_pos, 256, mountains[i].x_pos - 100, 432, mountains[i].x_pos + 100, 432);

        fill(186, 94, 1);
        triangle(mountains[i].x_pos -20, 380, mountains[i].x_pos -50, 432, mountains[i].x_pos +250, 432);

        fill(161, 81, 1);
        triangle(mountains[i].x_pos +200, 256, mountains[i].x_pos +100, 432, mountains[i].x_pos +300, 432);

        fill(186, 94, 1);
        triangle(mountains[i].x_pos +80, 380, mountains[i].x_pos +50, 432, mountains[i].x_pos +350, 432);

        fill(186, 94, 1);
        triangle(mountains[i].x_pos +60, 330, mountains[i].x_pos, 432, mountains[i].x_pos +200, 432);
        fill(161, 81, 1);
        triangle(mountains[i].x_pos +30, 380, mountains[i].x_pos, 432, mountains[i].x_pos +200, 432);
        strokeWeight(5);
        stroke(150, 76, 0);
        line(mountains[i].x_pos +100, 250, mountains[i].x_pos,427);

        fill(204, 102, 0);
        triangle(mountains[i].x_pos +100, 256, mountains[i].x_pos, 427, mountains[i].x_pos +200, 430);
        fill(186, 94, 1);
        triangle(mountains[i].x_pos +60, 330, mountains[i].x_pos, 427, mountains[i].x_pos +185, 427);
        fill(161, 81, 1);
        triangle(mountains[i].x_pos +30, 380, mountains[i].x_pos, 427, mountains[i].x_pos +185, 427);
        strokeWeight(10);
        stroke(150, 76, 0);
        line(mountains[i].x_pos +100, 250, mountains[i].x_pos,427);
        line(mountains[i].x_pos +100, 250, mountains[i].x_pos +200,427);

        strokeWeight(1);
    }
}

// Function to draw trees objects.
function drawTrees(){
    for(var i=0; i< trees_x.length; i++)
    {
        noStroke();
        fill(131, 67, 2);
        rect(trees_x[i], trees_y, 20, 82);
        fill(31, 138, 49);
        beginShape();
            vertex(trees_x[i] + 10,trees_y + 10);
            //LHS
            vertex(trees_x[i] - 90, trees_y - 50);
            vertex(trees_x[i] - 10 , trees_y - 90);
            vertex(trees_x[i] - 80, trees_y - 70);

            //tip
            vertex(trees_x[i] + 10,trees_y - 250);
            //RDS
            vertex(trees_x[i] + 40,trees_y - 190);
            vertex(trees_x[i] + 20, trees_y - 170);
            vertex(trees_x[i] +45, trees_y - 180)
            vertex(trees_x[i] + 110,trees_y - 50)
        endShape(CLOSE);


    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
        // Draw canyons
        fill(100, 155, 255);
        stroke(0, 102, 0);
        ellipse(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, 200);

        fill(0, 0, 0);
        fill(100, 155, 255);
        triangle(t_canyon.x_pos, t_canyon.y_pos - 255, t_canyon.x_pos - t_canyon.width * 0.8, t_canyon.y_pos -70, t_canyon.x_pos + t_canyon.width * 0.8, t_canyon.y_pos - 70);

        noStroke();
        ellipse(t_canyon.x_pos, 550, t_canyon.width + 200, 200);
        rect(t_canyon.x_pos - t_canyon.width * 0.6, t_canyon.y_pos - 270, t_canyon.width * 1.2, 152);

        //I need to repair the water
        fill("blue");
        //rect(t_canyon.x_pos - t_canyon.width*1.45, 570, 292, 10);
        fill(101, 51, 0);
        stroke(0, 0, 0);
        strokeWeight(1);
        ellipse(t_canyon.x_pos, 500, t_canyon.width * .90, 10);
        ellipse(t_canyon.x_pos, 510, t_canyon.width * .50, 10);
        ellipse(t_canyon.x_pos, 520, t_canyon.width * .30, 10);
        ellipse(t_canyon.x_pos, 530, t_canyon.width * .70, 10);
        ellipse(t_canyon.x_pos, 540, t_canyon.width * .40, 10);
        ellipse(t_canyon.x_pos, 550, t_canyon.width * 1, 10);
        ellipse(t_canyon.x_pos, 560, t_canyon.width * .50, 10);
        ellipse(t_canyon.x_pos, 570, t_canyon.width * .30, 10);
        noStroke();
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
//    //gravity
//    if(gameChar_y < floorPos_y)
//    {
//        gameChar_y += 2;
//        isFalling = true;            
//    } else{
//        isFalling = false;
//    }
    
    //Canyon

    if((gameChar_world_x > t_canyon.x_pos - 50) && (gameChar_world_x < t_canyon.x_pos + 50))
    {
        isPlummeting = true;
    }
    else
    {
        isPlummeting = false; 
    }
    
    if((isPlummeting == true) && (gameChar_y > floorPos_y - 1))
    {
        gameChar_y += 4;    
    }
    
    if(gameChar_y > floorPos_y)
    {
        gameChar_y += 4;
        isPlummeting = true;
        gameChar_world_x = max(gameChar_world_x,0)
        gameChar_world_x = min(gameChar_world_x,300)
        canyons.y_rock += 3;
        canyons.y_rock2 += 2;
    }

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    // Draw collectable items

    stroke(182, 148, 13);
    strokeWeight(2);
    fill(235, 190, 44);
    ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size);
    fill(212, 168, 22);
    noStroke();
    ellipse(t_collectable.x_pos -.003, t_collectable.y_pos * 1.0043, t_collectable.size * .83);
    noStroke();
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20) 
    {
        t_collectable.isFound = true; 
    }
}
