var express = require("express");
var app = express();

var port = process.env.PORT;
var eventRouter = require("./src/routes/eventRoutes.js");

app.use(express.static('public'));
app.use(express.static('bower_components'));
//app.use(express.static(__dirname + './src/views'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/events', eventRouter);//express.router way,so we look for a /events/ or /events/event and respond accordingly

app.get('/', function(req, res){//another way of handling a req, without the express.router
    //res.send("Hellow orLD");
    res.render('index', { 
        list:["MEAN", "Rails", "React", "PHP"],
        nav:[{Link: 'stack', Text: 'Stack'},
             {Link: 'services', Text: 'Services'},
             {Link: 'portfolio', Text: 'Portfolio'},
             {Link: 'about', Text: 'About'},
             {Link: 'team', Text: 'Team'},
             {Link: 'contact', Text: 'Contact'},
        ]
        
    });
});

app.get('/routing', function(req, res){
    res.send("Hello router");
});

app.listen(port, function(err){
    if(err){ console.log(err); }
   console.log("Server is running on port: " + port); 
});

//https://mynodeapp-dova-elf1.c9users.io/