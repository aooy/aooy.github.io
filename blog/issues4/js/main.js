function initWorker(file, id){
	var worker = new Worker(file);
	worker.onmessage = function(e) {
		getCanvas2dCtx(id).putImageData(e.data,0,0);
	};
	return worker;
}

var image = new Image();
image.src = 'monkey.jpg';

image.onload = function(){
	console.log('loaded image');
	var imageData = initImgData(800, 500);
	var methodfile = './js/methods.js';
	//算法1
	paintGray(initWorker(methodfile, "#c1"), imageData, 1);
	//算法2
	paintGray(initWorker(methodfile, "#c2"), imageData, 2);
	//算法1+算法2
	paintGray(initWorker('./js/half1and2.js', '#c2a'), imageData);
	//算法3
	paintGray(initWorker(methodfile, '#c3'), imageData, 3);
	//算法4max
	paintGray(initWorker(methodfile, '#c4max'), imageData, 4);
	//算法4min
	paintGray(initWorker(methodfile, '#c4min'), imageData, 5);
	//算法5red
	paintGray(initWorker(methodfile, '#c5red'), imageData, 6);
	//算法5green
	paintGray(initWorker(methodfile, '#c5green'), imageData, 7);
	//算法5blue
	paintGray(initWorker(methodfile, '#c5blue'), imageData, 8);
	//算法6
	paintGray(initWorker(methodfile, '#c6'), imageData, 9, 4);
};

function initImgData(width, height){
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	var canvasCtx = canvas.getContext("2d");
	canvasCtx.drawImage(image, 0, 0, width, height);
	var data = canvasCtx.getImageData(0, 0, width, height);
	return data;
}

function getCanvas2dCtx(id){
	var ele = document.querySelector(id);
	setWh(ele, 800, 500);
	if(ele.tagName === 'CANVAS') return ele.getContext("2d");
}

function setWh(ele, width, height){
	ele.width = width;
	ele.height = height;
}

function paintGray( worker, imageData, methodType ,NumberOfShades){
	var numPixels = imageData.data.length/4;
	worker.postMessage([imageData, numPixels, methodType ,NumberOfShades])
	console.log('img over')
}





