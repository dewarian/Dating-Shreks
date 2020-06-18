const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const mongodb = require('mongodb');
const getUsers = require('./modules/getUsers');
const url = process.env.MONGO_URL;
const nameID = 'nameID';


router.use(bodyParser.urlencoded({
  extended: false,
}));

router.get('/', (req, res, next) => {
  // getUsers.getUsers();
  getUsers.goToUsers(req, res);
})

//   function goToUsers(req, res) {
//     router.get('/view', (req, res) => {
//         res.send({ hello: 'world' });
//       });
//   };

// const getUsers = require('./modules/getUsers');
// router.get('/view' ,goToUsers);

module.exports = router;
