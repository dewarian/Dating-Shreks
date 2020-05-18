var express = require("express");
var handlebars = require("express-handlebars");
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;

app.listen(3000, function listen(){
console.log("app started at port:", port);
})

app.set("views", path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars");
app.use(express.static('public'));

app.get('/info', info);

function info(request, response){
    response.render('info', {
        naam: "Parvin", 
        leeftijd: "19", 
        stad: "Amsterdam" 
    });
}

app.get('/if', ifStatement);

function ifStatement(request, response){
    response.render('if', {
        author: true,
        voorNaam: "Jan",
        achterNaam: "Cremer"
        });
}

app.get("/array", array)

function array(request, response){
    response.render('array', {
        naamQuotes: "Jan Cremer",
        quotes:[
            {quote: "Mensen die dieren haten zijn rotmensen. Kijk maar naar dat Spaanse volkje. Het zijn dierenmoordenaars. Omdat ze te laf zijn om een dier aan te kijken." },
            {quote: "Vrouwen hebben altijd gelijk: geef ze het dan ook."},
            {quote: "Rembrandt? Wie is dat? Ik doe niet aan sport."},
            {quote: "Je komt alleen; Je leeft alleen; Je sterft alleen."}
        ]
    });
}



