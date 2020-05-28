const express = require('express');

const handlebars = require('express-handlebars');

const path = require('path');

const bodyParser = require('body-parser');

const slug = require('slug');

const app = express();
const port = process.env.PORT || 3000;


function listen() {
  // eslint-disable-next-line no-console
  console.log('app started at port:', port);
}
app.listen(3000, listen);


const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('website'));

function home(request, respone) {
  respone.send('<h1>Welcome op mijn site!</h1> <p>Hier ga ik formulieren testen. Wil jij het ook teseten? klik dan op deze <a href="http://localhost:3000/form.html">link</a?</p>');
}
app.get('/', home);

function volgendeFilm(request, response) {
  response.render('volgendeFilm-succes', { data: request.body });
}
app.post('/movie', urlencodedParser, volgendeFilm);

function filmDaarop(request, response) {
  response.render('filmDaarna', { data: request.body });
}
app.post('/movie1', urlencodedParser, filmDaarop);

function succesMan(request, response) {
  response.render('succes', { data: request.body });
}
app.post('/succes', urlencodedParser, succesMan);

const addMovie = {
  id: '',
  title: '',
  description: '',
};

function add(request, response) {
  const id = slug(request.body.title).toLocaleLowerCase();

  addMovie.push({
    id,
    title: request.body.title,
    description: request.body.description,
  });
  // eslint-disable-next-line prefer-template
  response.redirect('/' + id);
}

app.post('/add', urlencodedParser, add);
