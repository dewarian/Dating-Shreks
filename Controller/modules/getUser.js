const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const url = process.env.MONGO_URL;
let userData;

function getUsers(req, res) {
  console.log('get users');
  mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray(function(err, result) {
        if (err) throw console.log(`[MONGO ERR]: \n ${err}`)
        userData = result;
        res.render('users', {
          title: 'Shreks App',
          users: userData
        });
      })
    }
  })
}

function deleteUser(req, res) {
  console.log(`trying to delete: ${req.body.id}`);
  mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true
  }, function(err, client) {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
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
}


// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
exports.userData = userData;
module.exports = {
  getUsers,
  deleteUser,
};
