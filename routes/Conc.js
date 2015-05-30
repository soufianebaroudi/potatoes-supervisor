var express = require('express');
var gdal = require('gdal');
var router = express.Router();


var dataset = gdal.open("../Data/parcellaire.shp");
var layer = dataset.layers.get(0);




router.get('/', function(req, res, next) {

    var ConcName = new Array();

    layer.fields.forEach(function(value , key) {


        ConcName.push(value.name);

    });

// send an array of Concetration Names

    res.send(ConcName);


});

module.exports = router;