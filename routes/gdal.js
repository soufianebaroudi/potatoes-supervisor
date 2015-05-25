var express = require('express');
var gdal = require('gdal');
var router = express.Router();


var dataset = gdal.open("../Data/parcellaire.shp");
var layer = dataset.layers.get(0);
var FeautureCollection = {
    type : "FeatureCollection" ,
    features : [] };



layer.features.forEach(function(feature) {


    FeautureCollection.features.push({ "type" : "Feature" ,
        properties : JSON.parse(feature.clone().fields.toJSON()) ,
        geometry : JSON.parse(feature.getGeometry().toJSON())})

});

router.get('/', function(req, res, next) {

    res.send(FeautureCollection);

});


module.exports = router;