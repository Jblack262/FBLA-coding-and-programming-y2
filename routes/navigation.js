const express = require('express');
const navigation = express.Router();
//authentication middleware
// const {ensureAuthenticated} = require('../middleware/auth.js')

//home page
navigation.get('/', (req, res) => {
  res.render('pages/index')
})
//log in page
navigation.get('/login', (req, res) => {
  res.render('pages/login')
})
//sign up page
navigation.get('/sign-up', (req, res) => {
  res.render('pages/signUp')
})

// ALL ADMIN PAGES HERE

//admin home page
// navigation.get('/adminHome', ensureAuthenticated, (req, res) => {
//   res.render('pages/adminHome')
// })

module.exports = navigation;