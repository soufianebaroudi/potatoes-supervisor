var gdal = require("gdal");


var dataset = gdal.open("../Data/parcellaire.shp");

var layer = dataset.layers.get(0);

Tab = new Array();

layer.features.forEach(function(feature) {
	
	Tab = feature.fields.getNames();
	
	
	   for(var i = 0 ; i < Tab.length; i++) {
						
			console.log(Tab[i] + " " + feature.fields.get(Tab[i]));
		}
	
			console.log(feature.getGeometry().toJSON());

}); 