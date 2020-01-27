const TokenModel = require('../models').access_tokens;
const Handler = require('../middleware/generic_handler');
const Users = require('../models/users_queries');
const jwt = require('jsonwebtoken');


exports.createUser = function (req, res, next){
    let user = {...req.body.user};
    user.role = 1;
    user.active = 0;
    Handler.generic_handler(
        req
      , res
      , next
      , Users.create(user)
      , (ok) => { return null; }
    );
}


exports.loginUser = function (req, res, next){
    Handler.generic_handler( 
        req
      , res
      , next
      , Users.findOne({email: req.body.email}
                    , ['id','username','password'
                     , 'first_name', 'last_name'
                     , 'email', 'adress'])
      , (userInfo) => {
        switch (userInfo.validPassword(req.body.password)){
            case true: {
                // JWT tokens are stateless - they expire;
                // You don't need to save them in the DB
                // If you save the JWT in the database, you kind of miss the point,
                // and you could simply generate a random string
                // from a crypto library;
                const token  = jwt.sign({id: userInfo.dataValues.id}
                                      , req.app.get('secretKey')
                                      , { expiresIn: '2h' }); // Set Expiration of token.
                let result   = {...userInfo.dataValues};
                result.token = token;
                delete result.id;       // Why do you want to delete the id?
                delete result.password;
                return result;
                break;
            }
            default:
                return null;
        }
      });
}


exports.getUserData = function (req, res, next){
    Handler.generic_handler(
        req
      , res
      , next
      , Users.findOne({id: req.body.id}
                    , ['username', 'first_name'
                     , 'last_name', 'email'
                     , 'adress'])
      , (userInfo) => {
        return userInfo.dataValues;
      });
}

exports.updateUser = function (req, res, next){
    Handler.generic_handler(
        req
      , res
      , next
      , Users.update(req.body.user, req.body.user.id)
      , (userInfo) => {
        return userInfo.dataValues;
      });
}

exports.deleteUser = function (req, res, next){
    Handler.generic_handler(
        req
      , res
      , next
      , Users.delete(req.body.id)
      , (userInfo) => {
        return userInfo.dataValues;
      });
}
// JWT is stateless: just delete the cookie from the client side, and the user is logged out.
exports.logOut = function (req, req, next){
    return null;
}
