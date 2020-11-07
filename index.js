const express = require('express');
const PATH = require('path');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
const dotenv = require('dotenv');
let client = require('./db');

const app = express();
const PORT = 5000;

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PATH.join(__dirname, 'public')));

app.use('/', route);
app.get('/', (req, res) => {
  res.render('pages/index');
})

const DB_URL = process.env.DB_URL;
client.connect(DB_URL, (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log('Listening on port 5000...');
    });
  }
});

//CRUD for Read part for graduates begin here
  app.get('/graduate-card', (req, res) => {
    const form_data = req.body;
    console.log(req.body);
    const name = form_data['name'];
    const logo = form_data['logo'];

    const LOGO = {
      name: name,
      logo: logo,
    }
    console.log(ORG);

    res.render('/graduate-card', {
      name: name,
      logo: logo,
    })
  });

  app.post('/graduates', (req, res) => {
    const form_data = req.body;
    console.log(req.body);
    const firstName = form_data['firstName'];
    const lastName = form_data['lastName'];
    const year = form_data['year'];
    const email = form_data['email'];
    const githubUrl = form_data['githubUrl'];
    const linkedinUrl = form_data['linkedinUrl'];
    const phone = form_data['phone'];
    const bio = form_data['bio'];

    const USERS = {
    firstName: firstName,
    lastName: lastName,
    year: year,
    email: email,
    githubUrl: githubUrl,
    linkedinUrl: linkedinUrl,
    phone: phone,
    bio: bio
  }
    console.log(USERS);
    
  db_handler.collection(COLLECTION_NAME).find({}).toArray((err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.render('/graduates', {
        'USERS': result
      });
    }
  });

  
});

module.exports = app;

