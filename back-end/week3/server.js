var express = require("express");
var handlebars = require("express-handlebars");
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;
var slug = require('slug')
var bodyParser = require('body-parser');
var arr = {};

app.listen(3000, function listen(){
console.log("app started at port:", port);
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set("views", path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static('website'));

app.get("/", home);
function home(request, respone){
 respone.send("<h1>Welcome op mijn site!</h1> <p>Hier ga ik formulieren testen. Wil jij het ook teseten? klik dan op deze <a href='http://localhost:3000/form.html'>link</a?</p>");
}

app.post('/movie', urlencodedParser, volgendeFilm);
function volgendeFilm(request, response){
  movieChoiceOne = request.body.movie;
  response.render('volgendeFilm-succes', {data: request.body}); 
}

app.post('/movie1', urlencodedParser, filmDaarop);
function filmDaarop(request, response){
  console.log(request.body);
  response.render('filmDaarna', {data: request.body});
}

app.post('/succes', urlencodedParser, succesMan);
function succesMan(request, response){
  response.render('succes', {data: request.body});
}

const addMovie = {
  id: "",
  title: '',
  description: ''
} 

app.post('/add', urlencodedParser, add);

function add(request, response){
  var id = slug(request.body.title).toLocaleLowerCase();

  addMovie.push({
    id: id,
    title: request.body.title,
    description: request.body.description
  })
  response.redirect('/' + id);
}