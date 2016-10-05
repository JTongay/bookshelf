'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';
var config = require('./knexfile');
var knex = require('knex')(config[env]);
var port = process.env.PORT || 3000;
var ejs = require('ejs');
var bcrypt = require('bcrypt-as-promised');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('booyah')
})

app.get('/users', function (req, res) {
  knex('users').then(function (stuff) {
    res.render('users', {stuff: stuff})
  })
})

app.get('/signup', function (req, res) {
  knex('users').then(function (stuff) {
    res.render('new-user', {stuff: stuff})
  })
})

app.post('/users', function (req, res) {
  bcrypt.hash(req.body.password, 12)
    .then(function(hashed_password){
      return knex('users').insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        hashed_password: hashed_password
      })
    })
    .then(function(users){
        res.redirect(req.url)
    })
})


app.listen(port, function () {
  console.log("listening on port: " + port);
})

module.exports = app;
