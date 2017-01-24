var express = require("express");
var dbRouter = express.Router();
var mongodb = require("mongodb").MongoClient;

//eventdata
var eventData = [  {
                 name: 'man 1',
                 description: 'desc man 1', 
                 date: 'date 1', 
                 time: 'time 1', 
                 duration: 'dur 1',
                 location: {
                     street: 'st 1',
                     city: ' city 1',
                     state: ' state 1',
                     zip: 'zip 1'
                 },
                 capacity: 1
                 },
                 {
                 name: 'man 2',
                 description: 'desc 2', 
                 date: 'date 2', 
                 time: 'time 2', 
                 duration: 'dur 2',
                 location: {
                     street: 'st 2',
                     city: 'city 2',
                     state: 'state 2',
                     zip: 'zip 2'
                 },
                 capacity: 2
                 },
                 {
                 name: 'man 3',
                 description: 'desc 3', 
                 date: 'date 3', 
                 time: 'time 3', 
                 duration: 'dur 3',
                 location: {
                     street: 'st 3',
                     city: 'city 3',
                     state: 'state 3',
                     zip: 'zip 3'
                 },
                 capacity: 3
                 },
];

dbRouter.route('/AddEventData')
    .get(function(req, res){
        
        //connect to mongodb instance@localhose:27017 and to a particular db within the instance called eventsApp
        var url = 'mongodb://localhost:27017/eventsApp';
        mongodb.connect(url, function(err, db){//connect to db, pass url and function(instr for insert data) as params
            var collection = db.collection('events');//define a collection for events data and pass a name 'events', it gets it for us, if non exhistant, it creates it for us
            collection.insertMany(eventData, function(err, results){//we insert a whole array into our collection and pass a callback. mongo passes 'results' after inserting data so we look for that
                res.send(results);//send results set back to page
                db.close();//close our db
            });
        }); 
});


module.exports = dbRouter;

