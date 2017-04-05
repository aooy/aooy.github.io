onmessage = function(e) {
	console.log('Message received from main script');
	//console.log(e.data)
	var imageData = e.data[0].data;
	var numPixels = e.data[1];
	var NumberOfShades = e.data[2];
	for (var i = 0; i < numPixels; i++) {
		var Red = imageData[i * 4];
		var Green = imageData[i * 4 +1];
		var Blue = imageData[i * 4 + 2];
		var ConversionFactor = 255 / (NumberOfShades - 1)
		var AverageValue = (Red + Green + Blue) / 3
		var Gray = Math.round((AverageValue / ConversionFactor) + 0.5) * ConversionFactor		
		imageData[i * 4] = Gray;
		imageData[i * 4 +1] = Gray;
		imageData[i * 4 + 2] = Gray;
	}
	postMessage(e.data[0]);
};
