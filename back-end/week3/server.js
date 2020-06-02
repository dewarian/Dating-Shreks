// Setup for all dependencies
const express = require('express');

const handlebars = require('express-handlebars');

const path = require('path');

const bodyParser = require('body-parser');

const mongodb = require('mongodb');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();


// declaring consts en lets which are used further in the project
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
  console.log(`error with sessions ${err}`);
});


// making sure the session is setup
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


// Connect with mongoDB
mongodb.MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('MongoDB Error');
  } else {
    db = client.db(process.env.DB_NAME);
    user = db.collection('user');
  }
});


// set Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('website'));


// set the port
function listen() {
  console.log('app started at port:', port);
}
app.listen(3000, listen);

// All the routes/posts in the perfect flow order
// The home page: http:localhost:3000/
function home(req, res) {
  if (!req.session.nameID) {
    res.render('name');
  } else {
    res.redirect('succes');
  }
}
app.get('/', urlencodedParser, home);


function addName(req, res) {
  mongodb.MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log('MongoDB Error');
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.insertOne(
        {
          name: req.body.firstname,
        },
      );
      const nameNow = req.body.firstname;
      user.findOne({ name: nameNow }, (err, user) => {
        if (err) {
          console.log('It is not working');
        } else {
          req.session.nameID = user._id;
          res.render('form', {
            info: user,
          });
        }
      });
    }
  });
}

app.post('/name', urlencodedParser, addName);


function volgendeFilm(req, res) {
  user.update(
    { _id: req.session.nameID },
    {
      $set: { movieChoice1: req.body.movie },
    },
  );
  user.findOne({ _id: req.session.nameID }, (err, user) => {
    if (err) {
      console.log('It is not working');
    } else {
      res.render('volgendeFilm-succes', {
        info: user,
      });
    }
  });
}

app.post('/volgendeFilm-succes', urlencodedParser, volgendeFilm);


function succesRefresh(req, res) {
  if (!req.session.nameID) {
    res.redirect('/');
  } else {
    user.findOne({ _id: req.session.nameID }, (err, user) => {
      if (err) {
        console.log('It is not working');
      } else {
        res.render('succes', {
          info: user,
        });
      }
    });
  }
}

function succesMan(req, res) {
  user.update(
    { _id: req.session.nameID },
    {
      $set: { movieChoice2: req.body.movie1 },
    },
  );
  user.findOne({ _id: req.session.nameID }, (err, user) => {
    if (err) {
      console.log('It is not working');
    } else {
      res.redirect('succes');
    }
  });
}

app.post('/succes', urlencodedParser, succesMan);
app.get('/succes', urlencodedParser, succesRefresh);


function deleteAccount(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/succes');
    } else {
      // user.remove(
      //   { _id: nameID },
      //   {
      //     movieChoice1: user.movieChoice1,
      //     movieChoice2: user.movieChoice2,
      //   },
      // );
      res.clearCookie(nameID);
      res.redirect('/');
    }
  });
}

app.post('/delete', deleteAccount);
