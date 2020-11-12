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
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(PATH.join(__dirname, 'public')));

app.use('/', route);
app.get('/', (req, res) => {
  res.render('pages/index');
})


app.listen(PORT, () => {
  console.log(`Boston Software Jobs up and running on port ${PORT}!!`);
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

module.exports = app;

