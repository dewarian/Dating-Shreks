// Setup for all dependencies
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const fetch = require('node-fetch');
const helmet = require('helmet');
require('dotenv').config();


// declaring consts en lets which are used further in the project
const url = process.env.MONGO_URL;
const app = express();
const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
const nameID = 'nameID';
const db = null;
const user = null;

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

// set Handlebars
app.set('views', path.join(__dirname, 'View'));
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  partialsPath: 'partials',
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @title express listen at port 3000
 */
function listen() {
  console.log('app started at port:', port);
}
const matchController = require('./Controller/matchController');
const homeController = require('./Controller/homeController');
app.use('/', matchController);
app.use('/', homeController);

app.listen(port, listen);


// Set up helmet
app.use(helmet());

// Helmet headers
// Content-Security-Policy: helps protecting against malicious injection of e.g. JS, CSS and PLugins
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['\'self\''],
    styleSrc: ['\'self\''],
  },
}));

// X-DNS-Prefetch-Control: disable DNS prefetching
app.use(helmet.dnsPrefetchControl()); // disabled by default

// X-Frame-Options: Polices clickjacking attacks (iframes) by setting the X-Frame-Options header
app.use(helmet.frameguard({action: 'deny'})); // don't allow page to be put in any iframes

// X-Powered-By: Hides the fact the website is powered by Express. Hackers can otherwise exploit vulnerabilities in Express/Node
app.use(helmet.hidePoweredBy());

// X-Download-Options: prevents opening HTML files in the context of the site, what people can do on old versions of Internet Explorer)
app.use(helmet.ieNoOpen());

// X-Content-Type-Options: prevents browser from sniffing MIME files and instead blocks the resource if the server's wrong about the type of file
app.use(helmet.noSniff());

// X-Permitted-Cross-Domain-Policies: Prevents Adobe Flash and Acrobat form loading content on website
app.use(helmet.permittedCrossDomainPolicies()); // none by default

// Referrer Policy: Controls behavior of Referer header by setting the Referrer-Policy header
app.use(helmet.referrerPolicy({policy: 'no-referrer'}));

// X-XSS-Protection: Basic protection from particular cross-site scripting (XSS) attacks: hackers take control of JS in the browser
app.use(helmet.xssFilter());
