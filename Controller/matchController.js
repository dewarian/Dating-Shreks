const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const mongodb = require('mongodb');
const getUsers = require('./modules/getUser');
const url = process.env.MONGO_URL;
const nameID = 'nameID';


router.use(bodyParser.urlencoded({
  extended: false,
}));

router.get('/', (req, res) => {
  if (!req.session.nameID) {
    res.render('name')
  } else {
    getUsers.getUsers(req, res);
    console.log(`session: ${JSON.stringify(req.session.nameID)}`);
  }
})

router.get('/user', (req, res) => {
  mongodb.MongoClient.connect(url,  {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray((err, result) => {
        if (err) throw err;
        res.render('users', {users: result})
      });
    }
  })
})

router.post('/filtered', getUsers.filterUsers);

module.exports = router;
