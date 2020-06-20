const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const url = process.env.MONGO_URL;
let userData;

function getUsers(req, res) {
  const moviePref = req.body.movie;
  console.log('get users');
  mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
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
          users: userData,
          moviePref1: moviePref | 'none',
        });
      })
    }
  })
}


function filterUsers(req, res) {
  console.log('woopiedoopiedoo')
  mongodb.MongoClient.connect(url,  {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray((err, result) => {
        if (err) throw err;
        const moviesPicked = req.body.movie;
        console.log(result)
        console.log(moviesPicked);
        res.render('users', {users: result, movies: moviesPicked})
      });
    }
  })
}
// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
exports.userData = userData;
module.exports = {
  getUsers,
  filterUsers,
};
