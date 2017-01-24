var express = require("express");
var eventRouter = express.Router();
var mongodb = require("mongodb").MongoClient;

//we must install express4 to use these express.Router
 eventRouter.route('/')
    .get(function(req, res){
        var url = 'mongodb://localhost:27017/eventsApp';//define url
        mongodb.connect(url, function(err, db){//making connection to db
            var collection = db.collection('events');//address events collection
            collection.find({}).toArray(function(err, results){//tell collection to find all event records to pull it out and put in array format to use in html
                res.render("events", { //render events.ejs with a list of all these things to inject
                nav:[//{Link: 'stack', Text: 'Stack'},
                    //{Link: 'services', Text: 'Services'},
                    //{Link: 'portfolio', Text: 'Portfolio'},
                    {Link: 'our-events', Text: 'Our-Events'},
                    //  {Link: 'team', Text: 'Team'},
                    //  {Link: 'contact', Text: 'Contact'},
                ],
                events: results//THIS IS WHERE WE REF QUERY FROM DB, results is passed back from our .find so we pass it to events to be used in template/html
                }); 
            });
        });
    });
    
eventRouter.route('/:id')
    .get(function(req, res){
        var id = req.params.id;
        var url = 'mongodb://localhost:27017/eventsApp';
        mongodb.connect(url, function(err, db){
            var collection = db.collection('events');
            collection.find({}).toArray(function(err, results){
                res.render('event', { 
                    nav:[{Link: 'our-events', Text: 'Our-Events'}],
                    events: results[id]//as we go through array, we just want the one item to be passed
                });
            });
        });
});
    
module.exports = eventRouter;