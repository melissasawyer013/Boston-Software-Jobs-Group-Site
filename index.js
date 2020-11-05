const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(PATH.join(__dirname, 'public')));

let db_handler;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_ORG = process.env.DB_ORG;
const DB_GRAD = process.env.DB_GRAD;


app.get('/', (req, res) => {
    res.render('pages/index');
})

// app.get('/about-us', (req, res) => {
//     res.render('pages/about-us')
// })

router.use(router);
app.use('/', route);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  let mongo_client = mongodb.MongoClient;
  mongo_client.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db_client) => {
      if(err) {
          console.log("ERROR:" + err);
      } else {
          console.log("MONGODB DATABASE CONNECTED");
          db_handler = db_client.db(DB_NAME);
      }
  })
});

//CRUD for Read part for graduates begin here//
app.post('/graduates', (req, res) => {
    const form_data = req.body;
    console.log(req.body);
    const firstName = form_data['firstName'];
    const lastName = form_data['lastName'];
    const year = form_data['year'];
    const email = form_data['email'];
    const githubUrl =form_data['githubUrl'];
    const linkedinUrl =form_data['linkedinUrl'];
    const phone =form_data['phone'];
    const bio =form_data['bio'];

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

    db_handler.collection(COLLECTION_NAME).find({ }).toArray( (err, result) => {
      if(err){
        console.log(err);
      }
      else {
        console.log(result);
        res.render('/graduates', {
          'USERS':result
        });
      }
    });
  });
  
  
  


