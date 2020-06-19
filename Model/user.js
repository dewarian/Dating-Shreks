/* import mongoose conn */
const mongoose = require('./connection');

/* create model schema
*  automatically adds _id to schema
*/
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, min: 18, max: 80, required: true},
    movieChoices: {type: [String], required: true},
})

/* 
* Create collection API
*/

const UsersCollection = mongoose.model('User', UserSchema);

function getAllUsers() {
    return UsersCollection.find();
}

function addNewUser(userObject) {
    return UsersCollection.create(userObject);
}

function updateUser(userId, userObject) {
    return UsersCollection.findOneAndUpdate(userId, userObject);
}

function deleteUser(userId) {
    return UsersCollection.findByIdAndDelete(userId);
}

/* Export all functions for use in other files */
module.exports = {
    getAllUsers,
    addNewUser,
    deleteUser,
    updateUser
}