const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const url = process.env.MONGO_URL;
let resData;

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

const movCheck = (filterChoice, movieChoice1, movieChoice2) => {
  return (filterChoice[0] === movieChoice1 || filterChoice[0] === movieChoice2 || filterChoice[1] === movieChoice1 || filterChoice[1] === movieChoice2) ? true : false;
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
        const filterData = result.forEach(element => {
        resData = result.filter((element) => movCheck(moviesPicked, element.movieChoice1, element.movieChoice2)) 
      })
        // console.log(result)
        console.log(moviesPicked);
        res.render('users', {users: resData, movies: moviesPicked})
      });
    }
  })
}
// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
exports.resData = resData;
module.exports = {
  getUsers,
  filterUsers,
};
