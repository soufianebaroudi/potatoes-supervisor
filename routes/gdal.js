var express = require('express');
var gdal = require('gdal');
var router = express.Router();


var dataset = gdal.open("../Data/parcellaire.shp");
var layer = dataset.layers.get(0);
var FeautureCollection = [{}];
var Features = new Array();

layer.features.forEach(function(feature) {

    Features.push({ type : "feauture" , proproties : feature.clone().fields.toJSON() , geometry : feature.getGeometry().toJSON() })

});

FeautureCollection = ({ type : "FeautureCollection" , features : Features });


router.get('/', function(req, res, next) {
    console.log(FeautureCollection);
    res.send(FeautureCollection);
});

module.exports = router;
