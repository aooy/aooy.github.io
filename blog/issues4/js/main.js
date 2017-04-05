var c = document.querySelector("#c");
var ctx = c.getContext("2d");
var imageData;

var image = new Image();
image.src = 'monkey.jpg';

image.onload = function(){
	console.log('loaded image');
	var canvas = document.createElement('canvas');
	canvas.width = this.width;
	canvas.height = this.height;
	var canvasCtx = canvas.getContext("2d");
	canvasCtx.drawImage(image,0,0,this.width,this.height);
	imageData = canvasCtx.getImageData(0,0,this.width,this.height);
	paintGray(4);
};



if (window.Worker){
	var myWorker = new Worker('./js/comput.js');
} 

function paintGray(NumberOfShades){
	var numPixels = imageData.data.length/4;
	myWorker.postMessage([imageData, numPixels, NumberOfShades])
	console.log('img over')
			
}

myWorker.onmessage = function(e) {
	console.log(e.data);
	ctx.putImageData(e.data,0,0);
	console.log('Message received from worker');
};	



