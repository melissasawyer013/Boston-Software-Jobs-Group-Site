const express = require('express');
const PATH = require('path');
const bodyParser = require('body-parser');
const route = require('./routes/routes');
const dotenv = require('dotenv');
let client = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
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

module.exports = app;

