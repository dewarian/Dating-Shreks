const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const url = process.env.MONGO_URL;
let userData;

function getUsers(req, res) {
  const minAge = req.body.minAge;
  const maxAge = req.body.maxAge;
  const sexPref = req.body.sexPref;
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
        let sess = req.session.users = [];
        Object.entries(userData).forEach(([key, value]) => {
          sess.push(key, value);
        });
        res.render('users', {
          title: 'Shreks App',
          users: userData,
          minAge: minAge | '18',
          maxAge: maxAge | '28',
          sexPref: sexPref | 'other',
        });
      })
    }
  })
}


// exports.getUsers = getUsers;
// module.exports = {getUsers, goToUsers};
exports.userData = userData;
module.exports = {
  getUsers,
};
