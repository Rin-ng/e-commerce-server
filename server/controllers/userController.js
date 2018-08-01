const User  = require('../models/user');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

class UserController{
   static getUsers(req, res){
      UserController.allUsers(function(users){
         res
         .status(201)
         .json({
            message: "Here are the lists of users",
            users
         })
      })
   }
   
   static allUsers(cb) {
      User.find({})
      .then(function(users){
         cb(users);
         
      })
      .catch(function(err){
         res
         .status(401)
         .json({
            message: err.message
         })
      })
   }

   static register(req,res){
      let {name, email, password} = req.body;
      console.log("disini masuk ga?");
      email = email.toLowerCase();
      console.log(name, email, password);
      // res.send('haha')
      User.create({
         name,
         email,
         password,
      })
      .then(function(user){
         console.log("created")
         res
         .status(201)
         .json({
            message: "Successfully created new user",
         })
      })
      .catch(function(err){
         console.log("errornya disni?");
         res
         .status(401)
         .json({
            message: err.message
         })
      })
   }

   static signIn(req,res){
      console.log("at least masuk sini skrg");
      let {email, password} = req.body;
      User.findOne({ email })
      .then(function(user){
         user.comparePassword(password, function(err, isMatch){
               
            if(err){
               res
               .status(401)
               .json({
                  message: err.message
               })
            }
            else{
               if(isMatch){
                  let token = jwt.sign({_id: user.id, position: user.position}, process.env.secretKey)
                  res
                  .status(200)
                  .json({
                     user, 
                     token, 
                     message: "Token generated"
                  });
               }
               else{
                  res
                  .status(400)
                  .json({
                     message: "Password is wrong!"
                     })
                  }
               }
            }
         )
      })
      .catch(function(err){
         res
         .status(400)
         .json("User is not found!");
      })
   } 
	 
   static findOne(req, res){
      let {id} = req.headers;

      User.findById({_id:id})
      .then(function(user){
         res.status(200)
         .json(user);
      })
      .catch(function(err){
         res.status(400)
         .json(err.message)
      })
   }

   static adminAddUser(req, res){
      
      let {name, email, password, position} = req.body;
      console.log("sini?")
      User.create({
         name,
         email,
         password,
         position
      })
      .then(function(){
         console.log("oke kok?")
         res
         .status(201)
         .json({
            message: "Successfully created new user",
         })
      })
      .catch(function(err){
         console.log("knp ga oke?");
         res
         .status(401)
         .json({
            message: err.message
         })
      })
   }

   static updateUser(req,res){
      let {name, email, password, position} = req.body;
      let {id} = req.headers;
      console.log("~~~", req.decoded);
      User.findById({_id: id})
      .then(function(user){
         user.name = name;
         user.email = email;
         user.password = password;
         if(req.decoded.position.toLowerCase() === "admin"){
            user.position = position;
         }
         user.save()
         .then(function(updated){
            User.findById({_id:id})
            .then(function(updatedInfo){
               res.status(200)
               .json({
                  message: "Info Updated",
                  updatedInfo
               })
            })
            .catch(function(err){
               res.status(400).json(err.message);
            })
         })
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }
}

module.exports = UserController;