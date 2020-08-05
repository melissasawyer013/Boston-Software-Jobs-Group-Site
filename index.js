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

app.get('/', (req, res) => {
    res.render('pages/index');
})

// app.get('/about-us', (req, res) => {
//     res.render('pages/about-us')
// })

router.use(router);
app.use('/', route);

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}`);
});