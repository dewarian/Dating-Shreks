const express = require('express');

const handlebars = require('express-handlebars');

const path = require('path');

const bodyParser = require('body-parser');

const slug = require('slug');

const mongodb = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const url = process.env.MONGO_URL;
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
  respone.render('form.handlebars');
}
app.get('/', home);

function volgendeFilm(request, response) {
  response.render('volgendeFilm-succes', { data: request.body });
}
app.post('/volgendeFilm-succes', urlencodedParser, volgendeFilm);

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

app.get('/users', (req, res) => {
	MongoClient.connect(url, (err, client) => {
		const db = client.db('datingSite');

		if (err) {
			console.log('MongoDB Error:' + err);
		} else {
			console.log('MongoDB Connected!');

			const users = db.collection('user');

			users.find({}).toArray((err, result) => {
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('types/index/user', {
						'userlist': result
					});
				} else {
					res.send('No data found');
				}
			});
      client.close();
       }
  });
});
