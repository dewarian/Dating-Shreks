/* Import express */
const express = require('express');

/* import API from model */
const userApi = require('../Model/user');

/* Create new router */
const userRoute = express.Router();

/* Request handlers 
    getAllUsers from mongodb
    when retrieved render users.handlebars with users
    and console.log it
*/
userRoute.get('/', (req, res) => {
    userApi.getAllUsers()
    .then((users) => {
        res.render ('users', {users})
        console.log(users)
    })
})

userRoute.post('/', (req, res) => {
    userApi.addNewUser(req.body)
    .then(() => {
        res.redirect('/users')
    })
})

userRoute.get('/new', (req, res) => {
    res.render('createUserForm')
})

/* export router */
module.exports = userRoute;