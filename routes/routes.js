const express = require('express');
const router = express();
let client = require('../db');
const dotenv = require('dotenv');
const db = require('../db');
const bodyParser = require('body-parser');
const axios = require('axios');
let token = null;
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const session = require('express-session');

dotenv.config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded( {extended: true} ));

const DB_NAME = process.env.DB_NAME;
const DB_ORG = process.env.DB_ORG;
const DB_GRAD = process.env.DB_GRAD;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;



let userEmail;
let user;
let githubUrl;
let profileUrl;

router.post('/checkEmail', (req, res) => {
  let formData = req.body;
  userEmail = formData['emailAddress'];
  let gradsFromDB = client.db(DB_NAME).collection(DB_GRAD);
  gradsFromDB.find({"email":userEmail}).toArray((err, arrayOfMatches) => {
    user = arrayOfMatches[0];
    githubUrl = user.githubUrl;
    console.log (`The user object is ${JSON.stringify(user)}`);
    console.log(`Their GitHub url is ${githubUrl}`);
    let match = arrayOfMatches[0].email;
    if (match === userEmail) {
      res.redirect('/login-after-email');
    } else {
      console.log(`match status betweetn ${arrayOfMatches[0]} and ${userEmail} is FALSE`);
      res.redirect('/login')
    }
  });  
});



// router.set('trust proxy', 1); // trust first proxy
router.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000,
  },
}))

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  // user=undefined;
  // githubUrl=undefined;
  // userEmail=undefined;
  done(null, user);
})

// passport.deserializeUser(function (user, cb) {
//   user=undefined;
//   githubUrl=undefined;
//   userEmail=undefined;
//   cb(null, user);
// })

passport.use(new GitHubStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  // login: githubUsername,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // console.log(`The profile from github is: ${profile}`);
  console.log(`Access token: ${accessToken}`);
  console.log(`Refresh token: ${refreshToken}`);
  console.log(`The profile is: ${JSON.stringify(profile)}`);
  profileUrl = profile.profileUrl;
  console.log(`The url from the authroizer is: ${profile.profileUrl}`);
  console.log("Now I'm heading to the /auth/github/callback")
  return done(null, profile, accessToken, refreshToken);
  // if (profile.profileUrl === githubUrl) {
  //   console.log("THEY'RE A MATCH JOHNNY!");
  //   res.redirect('/authorized')
    
  // } else {
  //   res.redirect('/access-denied')
  // }
  
}
));



const isAuth = (req, res, next, done) => {
  if (req.user) {
    console.log(`${user.firstName} is authenticated`)
    next();
  } else {
    console.log("Not authenticated.")
    return done()
  }
};

// passport.use(new GitHubStrategy({
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   callbackURL: "http://localhost:5000/auth/github/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ githubId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// ));




router.get('/login', isAuth, (req, res) => {
  if (user) {
    res.redirect('/profile')
  } else {
    res.render ('pages/login');
  } 
});

router.get('/logout', isAuth, (req, res) => {
  req.logout();
  user=undefined;
  githubUrl=undefined;
  userEmail=undefined;
  res.redirect('/login');
});

router.get('/access-denied', (req, res) => {
  user=undefined;
  githubUrl=undefined;
  userEmail=undefined;
  res.render('pages/access-denied');
});

router.get('/login-after-email', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
});

//https://github.com/login?client_id=044b8661035f08c4bb41&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D044b8661035f08c4bb41


router.get('/auth/github',
  passport.authenticate('github', {scope: [ 'user:user.html_url' ]
  })
);


router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.user;
    console.log("I made it to the /auth/github/callback function");
    console.log(`The githubUrl from the database is ${githubUrl} and the profileURL from the user is ${profileUrl}`);
    // req.user.html_url;
    // console.log(`html_url: ${user.html_url}`);
    // Successful authentication, redirect to authorized page.
    // console.log(user);
    if (githubUrl === profileUrl) {
      console.log('The urls from the user and the database match!');
      console.log(JSON.stringify(user));
      res.redirect('/authorized');
    } else {
      console.log("The urls from the user and the database don't match");
      // req.session.destroy();
      res.redirect('/access-denied');
    }
    
  }
);

router.get('/authorized', (req, res) => {
  if (user) {
    res.render('pages/authorized', {
      userEmail: userEmail,
      user: user,
    })
  } else {
    res.redirect('/login');
  };
});

router.get('/profile', (req, res) => {
  if (user) {
    return res.render('pages/profile', {
      user: user,
    })
  } else {
    res.redirect('/login');
  }
})

router.get('/', (req, res) => {
  if (user) {
    res.render('pages/index', {
      user: user,
    });
  } else {
    res.render('pages/index');
  }
})

router.get('/about-us', (req, res) => {
  if (user) {
    res.render('pages/about-us', {
      user: user,
    });
  } else {
    res.render('pages/about-us');
  }
})

router.get('/graduates', (req, res) => {
  
  if (user) {
    let gradsFromDB = client.db(DB_NAME).collection(DB_GRAD);
    gradsFromDB.find({"year":2018}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2018) => {
      // arrayOfGradsFromDb2018.sort();
      gradsFromDB.find({"year":2019}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2019) => {
        // arrayOfGradsFromDb2019.sort();
        gradsFromDB.find({"year":2020}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2020) => {
          // arrayOfGradsFromDb2020.sort();
          res.render('pages/graduates', {
            user: user,
            grads2018: arrayOfGradsFromDb2018,
            grads2019: arrayOfGradsFromDb2019,
            grads2020: arrayOfGradsFromDb2020,
          })
        })
      })
    });
  } else {
    res.render('pages/login');
  };
});

// router.get('/login', (req, res) => {
//   res.render('pages/login')
// })

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

// working kind of 
// router.post('/checkEmail', (req, res) => {
//   let formData = req.body;
//   let userEmail = formData['emailAddress'];
//   console.log(userEmail);
//   let gradsFromDB = client.db(DB_NAME).collection(DB_GRAD);
//   let searchResults = gradsFromDB.find({"email":userEmail});
//   console.log(gradsFromDB.find({"email":userEmail}));
//   if (searchResults != undefined) {
//     console.log(searchResults);
//     console.log("I think it was successful");
//     res.redirect('/');
//   } else {
//     res.redirect('/login')
//   }
// });

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


module.exports = router;
module.exports = router;
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
