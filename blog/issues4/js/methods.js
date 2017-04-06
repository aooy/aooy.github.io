onmessage = function(e) {
console.log('Message received from main script');
var imageData = e.data[0].data;
var numPixels = e.data[1];
var methodType = e.data[2];
var NumberOfShades = e.data[3];
switch(methodType){
	case 1:
		GrayFn = function(Red, Green, Blue){
			return (Red + Green + Blue) / 3;
		};
		break;
	case 2:
		GrayFn = function(Red, Green, Blue){
			return (Red * 0.3 + Green * 0.59 + Blue * 0.11);
		};
		break;	
	case 3:
		GrayFn = function(Red, Green, Blue){
			return ( Math.max(Red, Green, Blue) + Math.min(Red, Green, Blue) ) / 2;
		};
		break;
	case 4:
		GrayFn = function(Red, Green, Blue){
			return Math.max(Red, Green, Blue);
		};
		break;
	case 5:
		GrayFn = function(Red, Green, Blue){
			return Math.min(Red, Green, Blue);
		};
		break;	
	case 6:
		GrayFn = function(Red, Green, Blue){
			return Red;
		};
		break;	
	case 7:
		GrayFn = function(Red, Green, Blue){
			return Green;
		};
		break;	
	case 8:
		GrayFn = function(Red, Green, Blue){
			return Blue;
		};
		break;	
	case 9:
		GrayFn = function(Red, Green, Blue, NumberOfShades){
			var ConversionFactor = 255 / (NumberOfShades - 1);
			var AverageValue = (Red + Green + Blue) / 3;
			var Gray = Math.round((AverageValue / ConversionFactor) + 0.5) * ConversionFactor;	
			return Gray;
		};
		break;	
}
for (var i = 0; i < numPixels; i++) {
	var Red = imageData[i * 4];
	var Green = imageData[i * 4 +1];
	var Blue = imageData[i * 4 + 2];
	var Gray = GrayFn(Red, Green, Blue, NumberOfShades);
	imageData[i * 4] = Gray;
	imageData[i * 4 +1] = Gray;
	imageData[i * 4 + 2] = Gray;
}
postMessage(e.data[0]);
};
