var express = require('express');
var gdal = require('gdal');
var fs = require('fs');
var router = express.Router();


var dataset = gdal.open("../Data/parcellaire.shp");
var layer = dataset.layers.get(0);
var FeautureCollection = new Object();
var Features = new Array();



fs.readFile('../Data/file.json', 'utf8', function (err,data) {
 if (err) {
 return console.log(err);
 }

 FeautureCollection = data ;


 // console.log(FeautureCollection);

 });

/*layer.features.forEach(function(feature) {


    Features.push({ type : "feauture" , proproties : feature.clone().fields.toJSON() , geometry : feature.getGeometry().toJSON() })

});

FeautureCollection = ({ type : "FeautureCollection" , features : Features });*/


router.get('/', function(req, res, next) {

    res.send(FeautureCollection);
});


module.exports = router;