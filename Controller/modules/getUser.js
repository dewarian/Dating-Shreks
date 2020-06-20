const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const url = process.env.MONGO_URL;
let userData;

function getUsers(req, res) {
  const moviePref = req.session.MovieChoice1;
  const moviePref2 = req.session.MovieChoice2;
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
          moviePref2: moviePref2 | 'none',
        });
      })
    }
  })
}


router.get('/user', (req, res) => {
  mongodb.MongoClient.connect(url,  {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray((err, result) => {
        if (err) throw err;
        data = result;
      });
      const moviesPicked = req.body.movie;
      console.log(moviesPicked);
      res.render('users', {users: data})
    }
  })
})

router.post('/user', (req, res) => {
  mongodb.MongoClient.connect(url,  {useUnifiedTopology: true}, (err, client) => {
    if (err) {
      console.error(`[MONGO ERR]: ${err}`);
    } else {
      db = client.db(process.env.DB_NAME);
      user = db.collection('user');
      user.find().toArray((err, result) => {
        if (err) throw err;
        data = result;
      });
      const moviesPicked = req.body.movie;
      console.log(moviesPicked);
      res.render('users', {users: data})
    }
  })
})


// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
exports.userData = userData;
module.exports = {
  getUsers,
};
