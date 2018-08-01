const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const InventorySchema = new Schema({
   name:{
      type: String,
      required: "Please input item name",
   },
   price:{
      type: String,
      require: "Please input item price",
   },
   type:{
      type: String, 
      require: "Please input item type",
      
   },
   stockQty:{
      type: Number,
      require: "Please input stock quantity"
   },
   imgUrl:{
      type: String,
      require: "Please input image url"
   }
}, {timestamps: true});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;