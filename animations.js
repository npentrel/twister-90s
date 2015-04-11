// Define global variables for the colors and the sources of the pictures.
var color = ['#FF0000', '#0000FF', '#228B22', '#FFFF00'];
var data = ['foot_left.png', 'foot_right.png', 'hand_left.png', 'hand_right.png'];
var default_img = "questionmark.png";
var RUN = false;
var timeout_random;

// Function to create the default images in the canvas on load.
window.onload = function(){

	var c1=document.getElementById("colorCanvas");
	var ctx1=c1.getContext("2d");
	ctx1.clearRect(0,0,ctx1.canvas.width,ctx1.canvas.height)
	var img=new Image();
	img.onload = function(){
		ctx1.drawImage(img,25,25);
	};
	img.src=default_img;

	var c2=document.getElementById("partCanvas");
	var ctx2=c2.getContext("2d");
	ctx2.clearRect(0,0,ctx2.canvas.width,ctx2.canvas.height)
	var img=new Image();
	img.onload = function(){
		ctx2.drawImage(img,25,25);
	};
	img.src=default_img;
	window.onkeydown = keyDown;
}

// Creates a circle in one canvas given the color as the index of the color array.
var drawCircle = function(clr_idx){
	var c=document.getElementById("colorCanvas");
	var ctx=c.getContext("2d");
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
	ctx.fillStyle=color[clr_idx];
	ctx.beginPath();
	ctx.arc(175, 175, 150, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#FFFFFF";
	ctx.stroke();
}

// Creates an image in the second canvas given the images as an index of the data array.
var drawImage = function(pic_idx){
	var c=document.getElementById("partCanvas");
	var ctx=c.getContext("2d");
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
	var img=new Image();
	img.onload = function(){
		ctx.drawImage(img,25,25);
	};
	img.src=data[pic_idx];
}

// Creates the animation of the circles.
var animationCircle = function(clr_idx, rand_nr, i){
	setTimeout(function(){

		if(i===15){
			drawCircle(rand_nr);
		} else {
			if(clr_idx===3){
				drawCircle(3);
				self.animationCircle(0, rand_nr, i+1);
			}
			else{
				drawCircle(clr_idx);
				self.animationCircle(clr_idx+1, rand_nr, i+1);
			}
		}

	}, 150);
}

// Creates the animation of the images.
var animationImage = function(data_idx, rand_nr, i){
	setTimeout(function(){

		if(i===15){
			drawImage(rand_nr);
		} else {
			if(data_idx===3){
				drawImage(3);
				self.animationImage(0, rand_nr, i+1);
			}
			else{
				drawImage(data_idx);
				self.animationImage(data_idx+1, rand_nr, i+1);
			}
		}

	}, 150);
}

// creates two times random numbers between 0-3 and calls the animations and plays the sound.
var random = function(){
	if (RUN) {	
		$("#button-container > a > span").html("Stop!");
		var rand1 = Math.ceil(4*Math.random()) - 1;
		var rand2 = Math.ceil(4*Math.random()) - 1;
		animationCircle(0, rand1, 0);
		animationImage(0, rand2, 0);
		mario.play();

		timeout_random = setTimeout(function(){
							self.random(); 
						}, 8000);
	} else {
			window.clearTimeout(timeout_random);
			$("#button-container > a > span").html("Shuffle!");
	}
}

var keyDown = function(e){
	if(e.keyCode == 38 || e.keyCode == 40){
		random();
	}
}

var randomLoop = function () {
	RUN = !RUN;

	if(RUN) 
		random();
}