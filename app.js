const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const env = require('./env');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

//This is for set up the  server and the port
const port = process.env.PORT || 3000;



//set the secretkey from the environment once
app.set('secretKey', env.secretKey);

// set morgan as a logger instead of console log
// https://www.npmjs.com/package/morgan
// write nonsense to file
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
// also display at the stdout
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(cors()); // this should solve the cors issues


//validate_user (if it is signed in for example, or if it has a token set)
//you just check for the token. and if its not expired.
function validate_user(req,res,next){
   jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:401, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  }); 
}

// promise errors by default:
// this will timeout the client.
// aka no clue how to use the express router
// to handle such reqests
process.on("unhandledRejection", function(reason,p){
  console.log(reason, p);
});

//handle errors
app.use(function(err, req, res, next) {
  console.log(err);
  switch(err.status){
    case 404:
      res.status(404).json({status:404, data: null});
      break;
    default:
      res.status(500).json({status:500, data:null});
  } 
});


// Public routes, people can access the api without being logged in
app.use('/api', publicRoutes);
// Protected routes, users can access the api only with a valid token
app.use('/api', validate_user, protectedRoutes);


app.listen(port, () => {
    console.log(`Money-safer app listening on port ${port}!`)
});