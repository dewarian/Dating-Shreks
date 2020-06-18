const express = require('express');

const mongodb = require('mongodb');
const url = process.env.MONGO_URL;

const session = require('express-session');
const sessionSecret = process.env.SESSION_SECRET;
const nameID = 'nameID';


function getUsers(req, res, next) {
  mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
      next()
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray(function(err, user) {
        if (err) {
          console.error(`[MONGO ERR]: Failed to retrieve. \n ${err}`)
        } else {
          userData = user;
          res.render('users', {
            users: userData,
          })
          next();
        }
      })
    }
  })
}

// function goToUsers(req, res) {
//     if (!req.session.nameID) {
//       res.render('name');
//     } else {
//       res.redirect('users');
//     };
//   };

function goToUsers(req, res) {
  router.get('/', (req, res) => {
    res.render('users', {
      title: 'Shreks App',
    });
  });
};

// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
module.exports = {
  getUsers,
  goToUsers
};
