const express = require('express');

const mongodb = require('mongodb');
const url = process.env.MONGO_URL;

const session = require('express-session');
const sessionSecret = process.env.SESSION_SECRET;
const nameID = 'nameID';

let userData;

async function getUsers(req, res) {
  mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray(function(err, user) {
        if (err) {
          console.error(`[MONGO ERR]: Failed to retrieve. \n ${err}`)
        } else {
          userData = user;
          // console.log(`getUsers(): ${JSON.stringify(user)}`);
        }
      })
    }
  })
  return userData;
}

getUsers().then(console.log(`testing promise ${userData}`));

console.log(`tet:`);

function goToUsers(req, res) {
    // getUsers();
    // dataSet = getUsers();
    // console.log(`${dataSet}`);
    res.render('users', {
      title: 'Shreks App',
      // userData: dataSet
    });
};

// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
exports.userData = userData;
module.exports = {
  getUsers,
  goToUsers
};
