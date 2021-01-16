const express = require('express');
const router = express();
let client = require('../db');
const dotenv = require('dotenv');
const db = require('../db');
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
  let gradsFromDB = client.db(DB_NAME).collection(DB_GRAD);
  gradsFromDB.find({"year":2018}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2018) => {
    // arrayOfGradsFromDb2018.sort();
    gradsFromDB.find({"year":2019}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2019) => {
      // arrayOfGradsFromDb2019.sort();
      gradsFromDB.find({"year":2020}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2020) => {
        // arrayOfGradsFromDb2020.sort();
        res.render('pages/graduates', {
          grads2018: arrayOfGradsFromDb2018,
          grads2019: arrayOfGradsFromDb2019,
          grads2020: arrayOfGradsFromDb2020,
        })
      })
    })
  })
})

router.get('/login', (req, res) => {
  res.render('pages/login')
})

router.get('/organizations', (req, res) => {
  let orgsFromDB = client.db(DB_NAME).collection(DB_ORG);
  orgsFromDB.find().toArray((err, arrayOfOrgsFromDb) => {
    res.render('pages/organizations', {
      all_orgs: arrayOfOrgsFromDb,
    })
  })
})



router.get('/add-org', (req, res) => {
  res.render('pages/add-org')
})

router.post('/add-org', (req, res) => {
  const form_data =req.body;
  console.log(form_data);

  const orgName = form_data['name'];
  const orgUrl = form_data['url'];
  const orgLogo = form_data['logo'];

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

router.post('/user-profile', (req, res) => {
  const form_data = req.body;
  const lastName = form_data['lname']
  const year = form_data['year']
  const gitHubUrl = form_data['git']
  const email = form_data['email']
  const LinkedIn = form_data['link']
  const PhoneNumber = form_data['phone']
  const Bio = form_data['bio']
  const Where_You_Interviewed = form_data['where_you_interviewed']
  const Where_you_worked = form_data['where_you_worked']
  const Where_you_currently_work = form_data['where_you_currently_work']
  const Interview_expirence = form_data['interview_Expirence']
  const firstName= form_data['fname']

  console.log(form_data);

  const my_object = {
    "firstName": firstName,
    "lastName": lastName,
    "year": year,
    "githubUrl": gitHubUrl,
    "email": email,
    "linkedinUrl": LinkedIn,
    "phone": PhoneNumber,
    "bio": Bio,
    "Where_you_interviewed": Where_You_Interviewed,
    "Interview_expirence": Interview_expirence,
    "Where_you_worked": Where_you_worked,
    "Where_you_currently_work": Where_you_currently_work  
  }

  let usersFromDB =client.db(DB_NAME).collection(DB_GRAD)
  usersFromDB.insertOne(my_object, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("A USER ENTRY HAS BEEN ADDED");
      res.redirect('/user-profile');
    } 
  })
});

// This is an example of how to get data from the database and have it available for the page you want to render
// when the user makes a request to this route
router.get('/example', (req, res) =>{
  let peopleFromDB = client.db(DB_NAME).collection(DB_GRAD)
  peopleFromDB.find().toArray( (err, arrayOfPeopleFromDb) => {
    console.log(arrayOfPeopleFromDb);
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
