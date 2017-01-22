var express = require("express");
var eventRouter = express.Router();

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

//we must install express4 to use these express.Router
 eventRouter.route('/')
    .get(function(req, res){
       res.render("events", { //render events.ejs with a list of all these things to inject
        nav:[//{Link: 'stack', Text: 'Stack'},
             //{Link: 'services', Text: 'Services'},
             //{Link: 'portfolio', Text: 'Portfolio'},
             {Link: 'our-events', Text: 'Our-Events'},
            //  {Link: 'team', Text: 'Team'},
            //  {Link: 'contact', Text: 'Contact'},
        ],
        events: eventData
      }); 
    });
    
eventRouter.route('/:id')
    .get(function(req, res){
        var id = req.params.id;
        res.render('event', { 
        nav:[{Link: 'our-events', Text: 'Our-Events'}],
        events: eventData[id]//as we go through array, we just want the one item to be passed
        });
});
    
module.exports = eventRouter;