const jwt = require ('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config()

const auth = function(req, res, next){
    let {token} = req.headers;
    
    if(token){
        jwt.verify(token, process.env.secretKey, function(err, decoded){
            // console.log("!!!AUTH", decoded)
            if(decoded){
                let decodedId = decoded._id
                // console.log("auth", decodedId);
                User.findById(decodedId)
                .then(function(user){
                    if(user.position.toLowerCase() === "admin"){
                        // console.log("masuk k admin")
                        req.decoded = decoded
                        next();
                    }
                    else{
                        res.status(403)
                        .json("UNAUTHORIZED")
                    }
                })
                .catch(function(err){
                    res.status(401)
                    .json(err.message)
                })
               
            }
            else{
                res.status(403).json("LOGIN DL BRO")
            }
        })
    }
   
}

module.exports = auth;