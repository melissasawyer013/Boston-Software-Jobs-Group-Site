const express = require('express');
const router = express.Router();
const app = express();

app.use("/static", express.static('./static/'));

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

//CRUD for Read part for graduates begin here//
app.get('/graduates', (req, res) => {
  db_handler.collection(COLLECTION_NAME).find({ }).toArray( (err, result) => {
    if(err){
      console.log(err);
    }
    else {
      console.log(result);
      res.render('/graduates', {
        'all_students':result
      });
    }
  });
});

app.post('/graduates', (req, res) => {
  const form_data =req.body;
  console.log(req.body);
  const fname = form_data['firstName'];
  const lname = form_data['lastName'];
  const year = form_data['year'];
  const email = form_data['email'];
  const githubUrl =form_data['githubUrl'];
  const linkedinUrl =form_data['linkedinUrl'];
  const phone =form_data['phone'];
  const bio =form_data['bio'];
  
  const graduates_obj = {
    fname: firstName,
    lname: lastName,
    year: year,
    email: email,
    githubUrl: githubUrl,
    linkedinUrl: linkedinUrl,
    phone: phone,
    bio: bio,
  }
  console.log(graduates_obj);
  db_handler.collection(COLLECTION_NAME).insertOne(graduates_obj, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("2018 Cohorts");
      res.redirect('/graduates');
    }
  })
});

module.exports = router;