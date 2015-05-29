var express = require('express');
var gdal = require('gdal');
var fs = require('fs');
var router = express.Router();


var dataset = gdal.open("../Data/parcellaire.shp");
var layer = dataset.layers.get(0);




router.get('/', function(req, res, next) {

    // Variable that contains our Data

    var FeautureCollection = {	type : "FeatureCollection" ,
        features : [] };



    // Geometry of the Bounds sent from Client

    var Envelope = new gdal.Envelope({ minX: JSON.parse(req.query.swLongitude) , maxX: JSON.parse(req.query.neLongitude)
        , minY: JSON.parse(req.query.swLatitude) , maxY: JSON.parse(req.query.neLatitude)}).toPolygon();


    // Data List corresponding to Bounds sent from Client

    var list = [];




    layer.features.forEach(function(feature) {

        if (Envelope.contains(feature.getGeometry())) {

            list.push(feature);
        }
    });


    list.forEach(function(feature) {

        FeautureCollection.features.push({ "type" : "Feature" ,
            properties : JSON.parse(feature.fields.toJSON()) ,
            geometry : JSON.parse(feature.getGeometry().toJSON())})


    });


//send data to client

    res.send(FeautureCollection);

});

module.exports = router;