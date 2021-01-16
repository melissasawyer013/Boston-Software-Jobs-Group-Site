// OLD AUTH WITH AXIOS
// router.get('/authorized', (req, res) => {
//   const requestToken = req.query.code;
//   console.log(requestToken);

//   const body = {
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     code: req.query.code
//   };
  
//   const opts = { headers: { accept: 'application/json' } };
//   axios.post(`https://github.com/login/oauth/access_token`, body, opts)
//     .then(res => res.data['access_token'])
//     .then(_token => {
//       token = _token;
//       console.log('My token:', token);
//       res.json({ ok: 1 });
//       // res.redirect('/authorized');
//     }).
//     catch(err => res.status(500).json({ message: err.message }));
// });