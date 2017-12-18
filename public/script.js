var canvas = document.getElementById('myCanvas');
var countDown = document.getElementById('countdown');
var timeBtn = document.getElementById('time');
var launch = document.getElementById('launch');
var livesTxt = document.getElementById('lives');
var speedTxt = document.getElementById('speedTxt');
var gover = document.getElementById('gover');
var ctx = canvas.getContext('2d');
var cent = document.getElementById('cent');

var z = canvas.height;
var s =0;
var dx = 0.4;
var dy =  1;
var dz = 1
var x= 20;
var y = 20;

var count = 5;
countDown.innerHTML = count+'';
var intrvl = setInterval(decrementCount, 1000);
var intr2;
var lives = 10;

speedTxt.innerHTML = dz;
livesTxt.innerHTML = lives + '';
launch.disabled = true;
gover.style.display = "none";

launch.addEventListener('click', function() {
	if(lives === 0) {
		gover.style.display = "block";
		launch.disabled = true;
	} else {
		lives -= 1;
		launch.disabled = true;
		livesTxt.innerHTML = lives + '';
		intr2 = setInterval(draw1, 10);
	}
});

function changeSpeed(increment) {
	if(increment) {
		if(dz < 10){
			dz+=1;
		}
	} else {
		if(dz > 1){
			dz-=1;
		}
	}
	speedTxt.innerHTML = dz;
}

function decrementCount() {
	if(count === 0) {
		timeBtn.style.display = "none";
		clearInterval(intrvl);
	}
	countDown.innerHTML = count+'';
	count = count-1;
}

function drawBall(){

	ctx.beginPath();
	ctx.arc(x, y, 15, 0, Math.PI*2);
	ctx.fillStyle="white";
	ctx.strokeStyle="red" ;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(x,y, 5,0,Math.PI*2);
	ctx.fillStyle="red";
	ctx.strokeStyle="red" ;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();

}
function draw(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	
	if(x+dx >canvas.width){
		dx=0.15+Math.random();
		x = 0;
  	}
	 x+=dx;
	 
	 drawArrow();
}

function draw1(){
	if((z <= y+10) && ((x >= (canvas.width/2) - 10) && (x <= (canvas.width/2) + 10))) {
		s = s+ 10;
		dx=0.15+Math.random();
		x = 0;
		cent.innerHTML = s;
	}

	if(z <= 0){
		z = canvas.height;
		launch.disabled = false;
		clearInterval(intr2);
	}
	z-=dz;
	drawArrow();

}
	

function drawArrow(){

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.fillStyle= "red";

  ctx.moveTo(canvas.width/2-5, z-25);
  ctx.lineTo(canvas.width/2-5, z-40);
  ctx.moveTo(canvas.width/2-5, z-40);
  ctx.lineTo(canvas.width/2-15, z-40);
  ctx.moveTo(canvas.width/2-15, z-40);
  ctx.lineTo(canvas.width/2, z-55);
  ctx.moveTo(canvas.width/2, z-55);
  ctx.lineTo(canvas.width/2+15, z-40);
  ctx.moveTo(canvas.width/2+15, z-40);
  ctx.lineTo(canvas.width/2+5, z-40);
  ctx.moveTo(canvas.width/2+5, z-40);
  ctx.lineTo(canvas.width/2+5, z-25);
  ctx.moveTo(canvas.width/2+5, z-25);
  ctx.lineTo(canvas.width/2-5, z-25);
  
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

}

function text(){
    var sec =5;
    ctx.fillStyle = "#000000";
	ctx.font = "20px Arial";
	ctx.fillText(sec + " Seconds",canvas.width/2-45,canvas.height/2+12);
}
function launch(){

	ctx.beginPath();
	ctx.fillStyle="#000000";
	ctx.fill();
	ctx.font = "20px Arial";
	ctx.fillText("launch",canvas.width/2-25,canvas.height-3);
	ctx.closePath();
}

setTimeout(function () { launch.disabled = false; setInterval(draw, 10) }, 6000);