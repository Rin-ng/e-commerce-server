var express = require('express');
var router = express.Router();
const cartController = require("../controllers/cartController");

router
  .post('/addItem', cartController.addItem)
  .put('/updateItem', cartController.updateItem)
  .delete('/deleteItem', cartController.deleteItem)
  .get('/', cartController.getCart)
  .post('/findItem', cartController.findItem)


module.exports = router;
