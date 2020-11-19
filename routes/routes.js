const express = require('express');
const router = express();
let client = require('../db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded( {extended: true} ));

const DB_NAME = process.env.DB_NAME;
const DB_ORG = process.env.DB_ORG;
const DB_GRAD = process.env.DB_GRAD;

router.get('/about-us', (req, res) => {
  res.render('pages/about-us')
})

router.get('/graduates', (req, res) => {
  res.render('pages/graduates')
})

router.get('/login', (req, res) => {
  res.render('pages/login')
})

router.get('/organizations', (req, res) => {
  res.render('pages/organizations')
})

router.get('/add-org', (req, res) => {
  res.render('pages/add-org')
})

router.post('/add-org', (req, res) => {
  const form_data =req.body;
  console.log(form_data);

  const orgName = form_data['orgName'];
  const orgUrl = form_data['orgUrl'];
  const orgLogo = form_data['orgLogo'];

  console.log(orgName, orgUrl, orgLogo);

  const org_obj = {
    name: orgName,
    url: orgUrl,
    logo: orgLogo
  }
  console.log(org_obj);
  

  let orgsFromDB =client.db(DB_NAME).collection(DB_ORG)
  orgsFromDB.insertOne(org_obj, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log("AN ORG ENTRY HAS BEEN ADDED")

    res.redirect('/add-org');
  }
    
  })
})



router.get('/style-guide', (req, res) => {
  res.render('pages/style-guide')
})

router.get('/graduate-card', (req, res) => {
  res.render('pages/graduate-card')
})

router.get('/organization-card', (req, res) => {
  // db_handler.collection(DB_ORG).find({}).toArray((err, org) => {
  //     if(err) return console.log(err);
  //     if(org) res.render('pages/organization-card', {orgArray:org})
  // });
  res.render('pages/organization-card');
})

router.get('/registration', (req, res) => {
  res.render('pages/registration')
})

router.get('/search-page', (req, res) => {
  res.render('pages/search-page')
})

router.get('/add-experience', (req, res) => {
  res.render('pages/add-experience')
})

router.get('/forgotpwd', (req, res) =>{
  res.render('pages/forgotpwd')
})

router.get('/user-profile', (req, res) =>{
  res.render('pages/userprofile')
})

// This is an example of how to get data from the database and have it available for the page you want to render
// when the user makes a request to this route
router.get('/example', (req, res) =>{
  let peopleFromDB = client.db(DB_NAME).collection(DB_GRAD)
  peopleFromDB.find().toArray( (err, arrayOfPeopleFromDb) => {
    console.log(arrayOfPeopleFromDb)
      res.render('pages/example', {
        people: arrayOfPeopleFromDb
      });
  });
})

router.get('/error', (req, res) =>{
  res.render('pages/error')
})

// This is an example of how to get data from the database and have it available for the page you want to render
// when the user makes a request to this route
router.get('/example', (req, res) =>{
  let peopleFromDB = client.db(DB_NAME).collection(DB_GRAD)
  peopleFromDB.find().toArray( (err, arrayOfPeopleFromDb) => {
    console.log(arrayOfPeopleFromDb)
      res.render('pages/example', {
        people: arrayOfPeopleFromDb
      });
  });
})

router.get('/error', (req, res) =>{
  res.render('pages/error')
})

module.exports = router;
