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
const nameID = 'nameID';
let db = null;
let user = null;
const sessionSecret = process.env.SESSION_SECRET;
const storeThing = new MongoDBStore({ // Hulp van Victor Boucher
  uri: url,
  collection: 'session',
});
storeThing.on('error', (err) => {
  console.log('error with sessions');
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

function home (request, response) {
  mongodb.MongoClient.connect(url, (err, client) => {
      if (err) {
          throw err;
      } else {
          db = client.db(process.env.DB_NAME);
          user = db.collection('user');
          response.render('form');
          user.findOne({
              _id: request.session.nameID
          }, (err, user) => {
              console.log(user.name);
          });
      }
  });
}

app.get('/', urlencodedParser, home);


function volgendeFilm(request, response) {
  response.render('volgendeFilm-succes', { data: request.body });
}
app.post('/volgendeFilm-succes', urlencodedParser, volgendeFilm);


function succesMan(request, response) {
  console.log(request.session.nameID);
  response.render('succes', { data: request.body });
}

app.post('/succes', urlencodedParser, succesMan);
app.get('/succes', urlencodedParser, succesMan);

function form(request, response) {
  console.log(request.session);
  response.render('name');
}


function addName(req, res, next) {
  mongodb.MongoClient.connect(url, (err, client) => {
    if (err) {
      throw err;
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.insertOne(
        {
          name: req.body.firstname,
        },
      );
      const nameNow = req.body.firstname;
      user.findOne({ name: nameNow }, function(err, user) {
        if(err) {
          console.log('It is not working');
        } else {
          req.session.nameID = user._id;
          res.redirect('succes');
        }
      });
    }
    // done();
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
