const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const mongodb = require('mongodb');
const getUsers = require('./modules/getUser');
const url = process.env.MONGO_URL;
const nameID = 'nameID';
const ObjectId = require('mongodb').ObjectId;



router.use(bodyParser.urlencoded({
  extended: false,
}));

router.get('/', (req, res) => {
  getUsers.getUsers(req, res);
})

router.post('/delete', (req, res) =>{
  console.log(`${JSON.stringify(res.body)}`)
  console.log(`trying to delete: ${req.body.id}`);
  mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function(err, client) {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.deleteMany({_id: new ObjectId(req.body.id)}), function(err, result){
        if(err) throw console.log(`failure: ${err}`);
        console.log(`trying to delete: ${req.body.id}`);
        user.find().toArray(function(err, result) {
          if (err) throw console.log(`[MONGO ERR]: \n ${err}`)
          userData = result;
          res.render('users', {
            title: 'Shreks App',
            users: userData
          });
        })
      }
    }
  })
});

module.exports = router;
