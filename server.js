// Setup for all dependencies
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

const handlebars = require('express-handlebars');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();

// declaring consts en lets which are used further in the project
const url = process.env.MONGO_URL;
const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});
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

// set Express engine to handlebars and link views to view
app.set('views', path.join(__dirname, 'View'));
app.engine('handlebars', handlebars({ defaultLayout: 'main', partialsPath: 'partials'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));


/* Import routers from controllers */
const matchController = require('./controller/matchController')
const homeController = require('./controller/homeController')
const userRoute = require('./Controller/usercontroller')


app.use('/', homeController);
// app.use('/user', matchController);
app.use('/user', userRoute);

/* Start server at port 3000 */
app.listen(3000, () => console.log(`Dating app listening at \x1b[31mhttp://localhost:${port}\x1b[0m`));
