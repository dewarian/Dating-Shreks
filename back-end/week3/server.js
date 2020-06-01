// Setup for all dependencies
const express = require('express');

const handlebars = require('express-handlebars');

const path = require('path');

const bodyParser = require('body-parser');

const mongodb = require('mongodb');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();

const url = process.env.MONGO_URL;
const app = express();
const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const nameID = 'sid';
let db = null;
const sessionSecret = process.env.SESSION_SECRET;
const storeThing = new MongoDBStore({ // Hulp van Victor
  uri: url,
  collection: 'session',
});
storeThing.on('error', (err) => {
  console.log('error with sessions' + err);
});


app.use(session({
  name: nameID,
  secret: sessionSecret,
  resafe: false,
  saveUninitialized: false,
  store: storeThing,
  cookie: {
    sameSite: true,
    secure: false,
  },
}));


function listen() {
  // eslint-disable-next-line no-console
  console.log('app started at port:', port);
}
app.listen(3000, listen);

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('website'));

function home(request, respone) {
  respone.render('form.handlebars');
}
app.get('/', urlencodedParser, home);


function volgendeFilm(request, response) {
  response.render('volgendeFilm-succes', { data: request.body });
}
app.post('/volgendeFilm-succes', urlencodedParser, volgendeFilm);


function succesMan(request, response) {
  response.render('succes', { data: request.body });
}
app.post('/succes', urlencodedParser, succesMan);
app.get('/succes', urlencodedParser, succesMan);


// Below I try to run the database and connect with it
function form(request, response) {
  console.log(request.session);
  response.render('name');
}


function addName(req, res, next) {
  mongodb.MongoClient.connect(url, (err, client) => {
    if (err) {
      throw err;
    }
    db = client.db(process.env.DB_NAME);
    const user = db.collection('user');
    user.insertOne(
      {
        name: req.body.firstname,
      },
    );
    // eslint-disable-next-line no-use-before-define
    done();
  });

  function done(err) {
    if (err) {
      next(err);
    } else {
      res.render('succes', {
        data: req.body,
      });
    }
  }
}

app.post('/name', urlencodedParser, addName);
app.get('/name', form);
