const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: false,
  }));

const urlencodedParser = bodyParser.urlencoded({extended: false});

let db = null;
let user = null;
const dbName = 'shreks';
const collectionName = 'users';
/**
 * @author ParvinBDJ
 * @description All the routes/posts in the perfect flow order, The home page: http:localhost:3000/
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

  router.get('/', home);

const datebase = require('../Model/db');
/**
 *
 * @param {object} req request obj, data parsed enters req
 * @param {object} res response obj, data that needs to be parses
 * Called mongodb again because of crashes when redirecting from deleteAcc / remCooke
 */
function addName(req, res) {

    datebase.initialize(dbName, collectionName, function(dbCollection) { // successCallback
        dbCollection.insertOne({ name: req.body.firstname, })
        const nameNow = req.body.firstname;
        dbCollection.findOne({ name: nameNow, })
        
      }, function(err) { // failureCallback
        throw (err);
      });

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
  
  router.post('/name', urlencodedParser, addName);
  
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
  
  router.post('/volgendeFilm-succes', urlencodedParser, volgendeFilm);
  
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
  
  router.post('/succes', urlencodedParser, succesMan);
  router.get('/succes', urlencodedParser, succesRefresh);
  
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
  
  router.post('/delete', deleteAccount);
  
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
  
  router.post('/cookieRemovie', removeCookie);
  


module.exports = router;