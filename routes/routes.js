const express = require('express');
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

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

router.get('/user-profile', (req, res) =>{
  res.render('pages/userprofile')
})



app.post('/user-profile', (req, res) => {
  // req.body contains form information
  const form_data = req.body;
  console.log(form_data);
const clientName = form_data['clientName'];
const bags = parseInt(form_data['bags']);

const my_object = {
      "Name": Name,
      "email": email,
      "PhoneNumber": PhoneNumber,
      "LinkedIn": LinkedIn,
      "Bio": Bio,
      "email": email,
      "Where_you_interviewed":Where_you_interviewed,
      "Where_you_worked":Where_you_worked,
      "Where_you_currently_work":Where_you_currently_work,
      "Interview_expirence":Interview_expirence
  }
  
  db_handler.collection().insertOne(my_object, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          console.log("Profile entered.");
           res.redirect('/');
      }
      
  });
  
});


module.exports = router;
