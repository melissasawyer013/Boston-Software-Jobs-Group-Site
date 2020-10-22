const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
const dotenv = require('dotenv');
const { ENGINE_METHOD_ALL } = require('constants');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.comfig();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(PATH.join(_dirname, 'public')));

let db_handler;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_ORG = process.env.DB_ORG;
const DB_GRAD = process.env.DB_GRAD;

// router.get('/about-us', (req, res) => {
//     res.render('/about-us');
// })

router.get('/about-us', (req, res) => {
    res.render('pages/about-us')
})

router.get('/graduates', (req, res) => {
    res.render('pages/graduates')
})

router.get('/graduates-2', (req, res) => {
  res.render('pages/graduates-2')
})

router.get('/graduates-3', (req, res) => {
  res.render('pages/graduates-3')
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

router.get('/style-guide', (req, res) => {
  res.render('pages/style-guide')
})

router.get('/graduate-card', (req, res) => {
  res.render('pages/graduate-card')
})

router.get('/organization-card', (req, res) => {
  res.render('pages/organization-card')
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

router.get('/error', (req, res) =>{
  res.render('pages/error')
})

module.exports = router;

router.use(router);

router.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  // create connection to our database
  let mongo_client = mongodb.MongoClient;
  mongo_client.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db_client) => {
      if(err) {
          console.log("ERROR:" + err);
      } else {
          // Upon success, print a message saying "Database Connected"
          console.log("MONGODB DATABASE CONNECTED");
          // Upon success, you should also connect to the 'bsj' database.
          // Use db_handler for future use
          db_handler = db_client.db(DB_NAME);
      }
  })
});