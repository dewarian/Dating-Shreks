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
const urlencodedParser = bodyParser.urlencoded({extended: false});
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
mongodb.MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.log('MongoDB Error');
  } else {
    db = client.db(process.env.DB_NAME);
    user = db.collection('user');
  }
});


// set Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('website'));


// set the port
/**
 * @title express listen at port 3000
 */
function listen() {
  console.log('app started at port:', port);
}
app.listen(3000, listen);

// All the routes/posts in the perfect flow order
// The home page: http:localhost:3000/
/**
 *
 * @param {*} req
 * @param {*} res
 */
function home(req, res) {
  if (!req.session.nameID) {
    res.render('name');
  } else {
    res.redirect('succes');
  }
}
app.get('/', urlencodedParser, home);

/**
 *
 * @param {object} req request obj, data parsed enters req
 * @param {object} res response obj, data that needs to be parses
 * Called mongodb again because of crashes when redirecting from deleteAcc / remCooke
 */
function addName(req, res) {
  mongodb.MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
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
      user.findOne({name: nameNow}, (err, user) => {
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

/**
 * @title Volgende film
 * @description send user to next movie + update user with preferred movies
 * @param {object} req request object
 * @param {object} res response object
 */
function volgendeFilm(req, res) {
  user.update(
      {_id: req.session.nameID},
      {
        $set: {movieChoice1: req.body.movie},
      },
  );
  user.findOne({_id: req.session.nameID}, (err, user) => {
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

/**
 * @title succes refresh?
 * @description description of function succesRefresh
 * @param {*} req request
 * @param {*} res response
 */
function succesRefresh(req, res) {
  if (!req.session.nameID) {
    res.redirect('/');
  } else {
    user.findOne({_id: req.session.nameID}, (err, user) => {
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

/**
 * @title succesMan function
 * @description The description of the function succesMan
 * @param {*} req request
 * @param {*} res response
 */
function succesMan(req, res) {
  user.update(
      {_id: req.session.nameID},
      {
        $set: {movieChoice2: req.body.movie1},
      },
  );
  user.findOne({_id: req.session.nameID}, (err) => {
    if (err) {
      console.log('It is not working');
    } else {
      res.redirect('succes');
    }
  });
}

app.post('/succes', urlencodedParser, succesMan);
app.get('/succes', urlencodedParser, succesRefresh);

/**
 * @title Delete account
 * @description Delete account from database (and session)
 * @param {object} req request
 * @param {object} res response
 */
function deleteAccount(req, res) {
  user.deleteMany({_id: req.session.nameID});
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/succes');
    } else {
      res.clearCookie(nameID);
      res.redirect('/');
    }
  });
}

app.post('/delete', deleteAccount);

/**
 * @title delete cookie
 * @description delete the cookie that was created with nameID
 * @param {*} req request
 * @param {*} res response
 */
function removeCookie(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/succes');
    } else {
      res.clearCookie(nameID);
      res.redirect('/');
    }
  });
}

app.post('/cookieRemovie', removeCookie);
