/* 
 * Import the mongoose module
 */
const mongoose = require('mongoose');
// add or statement if there is no database found, go to local database.
const connectionString = process.env.MONGOOSE_URL || "mongodb://localhost/users";

/*
 * Step 2
 * Open up a connection to the mongo database.
 */
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("connected to mongo at: " + connectionString);
  });


/* Export the mongoose object.
 */
module.exports = mongoose