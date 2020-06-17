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
  resave: false,
  saveUninitialized: false,
  store: storeThing,
  cookie: {
    sameSite: true,
    secure: false,
  },
}));


// Connect with mongoDB
// mongodb.MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//   if (err) {
//     console.log('MongoDB Error');
//   } else {
//     db = client.db(process.env.DB_NAME);
//     user = db.collection('user');
//   }
// });


// set Handlebars
app.set('views', path.join(__dirname, 'View'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname,'public')));


// set the port
/**
 * @title express listen at port 3000
 */
function listen() {
  console.log('app started at port:', port);
}

const homeController = require('./controller/homeController')
app.use('/', homeController);

app.listen(3000, listen);