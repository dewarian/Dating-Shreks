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
  getUsers.getUsers(req, res);
  console.log(`session: ${JSON.stringify(req.session)}`)
  console.log(`body: ${JSON.stringify(req.body.users)}`)
  let sess = req.session.users = [];
  sess.push();
})

module.exports = router;
