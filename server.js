'use strict';

const express = require('express');
var firebase = require('firebase');
var moment = require('moment')

const PORT = 3000;

const app = express();



firebase.initializeApp({
    serviceAccount: "./meteo-f0665-firebase-adminsdk-y173q-3822eeedd7.json",
    databaseURL: "https://meteo-f0665.firebaseio.com"
});

var sersorsRef = firebase.database().ref('/sensors/');


app.get('/meteo/measure', function(req, res){
    console.log('Got new request ' + req.query.qwe);
    var query = req.query;
    var timedate = moment().format();
    for (var param in req.query) {
        console.log(param, req.query[param]);
        var specificSensor = sersorsRef.child(param)
        var values = specificSensor.child('values')
        values.push({
            'value': req.query[param],
            'timeDate': timedate
        });
    }
    res.send('Data successfuly saved');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
