var express = require('express');
var router = express.Router();
const inventoryController = require("../controllers/inventoryControllers");
const auth = require('../middlewares/auth');
const img = require('../middlewares/img')


router
  .post('/addItem', auth, img.multer.single('file'), img.sendUploadToGCS, inventoryController.addItem)
  .post('/searchItem', inventoryController.searchItem)
  .post('/searchType', inventoryController.searchByType)
  .put('/updateItem', auth, img.multer.single('file'), img.sendUploadToGCS, inventoryController.updateItem)
  .delete('/deleteItem', auth, inventoryController.deleteItem)
  .get('/', inventoryController.getInventory)
  .get('/item', auth, inventoryController.getItem);


module.exports = router;
