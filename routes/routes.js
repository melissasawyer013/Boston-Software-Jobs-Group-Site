const express = require('express');
const router = express();
let client = require('../db');
const dotenv = require('dotenv');
const db = require('../db');
const bodyParser = require('body-parser');
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

let userEmail = undefined;
let user = undefined;
let githubUrl = undefined;
let profileUrl = undefined;

router.post('/checkEmail', (req, res) => {
  let formData = req.body;
  userEmail = formData['emailAddress'];
  let gradsFromDB = client.db(DB_NAME).collection(DB_GRAD);
  gradsFromDB.find({"email":userEmail}).toArray((err, arrayOfMatches) => {
    user = arrayOfMatches[0];
    githubUrl = user.githubUrl;
    let match = arrayOfMatches[0].email;
    if (match === userEmail) {
      res.redirect('/login-after-email');
    } else {
      console.log(`match status betweetn ${arrayOfMatches[0]} and ${userEmail} is FALSE`);
      res.redirect('/login')
    }
  });  
});

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
  done(null, user);
})

passport.use(new GitHubStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  profileUrl = profile.profileUrl;
  return done(null, profile, accessToken, refreshToken);
}
));

//NOT SURE IF WE EVEN NEED THIS
const isAuth = (req, res, next, done) => {
  if (req.user) {
    console.log(`${user.firstName} is authenticated`)
    next();
  } else {
    console.log("Not authenticated.")
    return done()
  }
};

router.get('/login', isAuth, (req, res) => {
  if (user) {
    res.redirect('/user-profile')
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

router.get('/auth/github',
  passport.authenticate('github', {scope: [ 'user:user.html_url' ]
  })
);

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.user;
    if (githubUrl === profileUrl) {
      res.redirect('/user-profile');
    } else {
      res.redirect('/access-denied');
    };
  }
);

// router.get('/authorized', (req, res) => {
//   if (user) {
//     res.render('pages/authorized', {
//       userEmail: userEmail,
//       user: user,
//     })
//   } else {
//     res.redirect('/login');
//   };
// });

router.get('/user-profile', (req, res) => {
  if (user) {
    return res.render('pages/user-profile', {
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
      gradsFromDB.find({"year":2019}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2019) => {
        gradsFromDB.find({"year":2020}).sort({"lastName":1}).toArray((err, arrayOfGradsFromDb2020) => {
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

router.get('/organizations', (req, res) => {
  if (user) {
    let orgsFromDB = client.db(DB_NAME).collection(DB_ORG);
    orgsFromDB.find().toArray((err, arrayOfOrgsFromDb) => {
      res.render('pages/organizations', {
        all_orgs: arrayOfOrgsFromDb,
        user: user,
    });
  });
  } else {
    res.render('pages/login');
  };
});

router.get('/add-org', (req, res) => {
  if (user) {
    res.render('pages/add-org', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

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
  if (user) {
    res.render('pages/graduate-card', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

router.get('/organization-card', (req, res) => {
  if (user) {
    res.render('pages/organization-card', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

router.get('/registration', (req, res) => {
  if (user) {
    res.render('pages/registration', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

router.get('/search-page', (req, res) => {
  if (user) {
    res.render('pages/search-page', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

router.get('/add-experience', (req, res) => {
  if (user) {
    res.render('pages/add-experience', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

router.get('/forgotpwd', (req, res) =>{
  res.render('pages/forgotpwd')
})

router.get('/user-profile-edit', (req, res) =>{
  if (user) {
    res.render('pages/user-profile-edit', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})

router.post('/update-user-profile', (req, res) => {
  const form_data = req.body;
  const lastName = form_data['lname']
  const year = form_data['year']
  const gitHubUrl = form_data['git']
  const email = form_data['email']
  const LinkedIn = form_data['link']
  const PhoneNumber = form_data['phone']
  const Bio = form_data['bio']
  const Where_You_Interviewed = form_data['where_you_interviewed']
  const Where_you_worked = form_data['where_you_worked']
  const Where_you_currently_work = form_data['where_you_currently_work']
  const Interview_expirence = form_data['interview_Expirence']
  const firstName= form_data['fname']

  console.log(form_data);

  const my_object = {
    "firstName": firstName,
    "lastName": lastName,
    "year": year,
    "githubUrl": gitHubUrl,
    "email": email,
    "linkedinUrl": LinkedIn,
    "phone": PhoneNumber,
    "bio": Bio,
    "Where_you_interviewed": Where_You_Interviewed,
    "Interview_expirence": Interview_expirence,
    "Where_you_worked": Where_you_worked,
    "Where_you_currently_work": Where_you_currently_work  
  }

  let usersFromDB =client.db(DB_NAME).collection(DB_GRAD)
  usersFromDB.insertOne(my_object, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("A USER ENTRY HAS BEEN ADDED");
      res.redirect('/user-profile');
    } 
  })
});

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
  if (user) {
    res.render('pages/error', {
      user: user,
    })
  } else {
    res.render('pages/error');
  };
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

router.get('/error', (req, res) => {
  if (user) {
    res.render('pages/add-org', {
      user: user,
    })
  } else {
    res.redirect('/login');
  };
})


module.exports = router;
