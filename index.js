const express = require('express');
const router = express.Router();
const PATH = require('path');
const bodyParser = require('body-parser');
const route = require('./routes/routes')

const app = express();
const PORT = 5000;

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


