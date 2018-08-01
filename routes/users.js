var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/auth');

router
  .post('/register', userController.register)
  .post('/signIn', userController.signIn)
  .post('/addUser', auth, userController.adminAddUser)
  .get('/', auth, userController.getUsers)
  .get('/single', auth, userController.findOne)
  .put('/update', auth, userController.updateUser);

module.exports = router;
