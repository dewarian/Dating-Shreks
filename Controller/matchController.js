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
  console.log(`session: ${JSON.stringify(req.body.users)}`)
})

router.post('/', (req, res) => {
  getUsers(req, res);
})

module.exports = router;
