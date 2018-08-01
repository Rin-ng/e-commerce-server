const Inventory  = require('../models/Inventory');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

class InventoryController{
   static getInventory(req,res){
      Inventory.find({})
      .then(function(items){
         res.status(200).json(items)
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }

   static getItem(req,res){
      let {itemid} = req.headers;

      Inventory.find({_id:itemid})
      .then(function(items){
         res.status(200).json(items)
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }

   static addItem(req,res){
      let {name, price, stockQty, type} = req.body;
      console.log("BODY BODY MASUK");
      let imgUrl = req.file.cloudStoragePublicUrl;

      Inventory.create({
         name,
         price, 
         stockQty,
         type,
         imgUrl
      })
      .then(function(item){
         console.log("di add item lho")
         res.status(200).json({item, img: res.file});
      })
      .catch(function(err){
         console.log("error d sini")
         res.status(400).json(err.message);
      })

   }

   static updateItem(req,res){
      let {name, price, stockQty, type, itemid} = req.body;
      let image;
      if(req.file){
         image = req.file.cloudStoragePublicUrl; 
      }

      console.log("body: ", req.body)
      
      let newData = {}
      if(name){
        newData["name"] = name;
      }
      if(price){
        newData["price"]= price;
      }
      if(stockQty){
        newData["stockQty"] = stockQty;
      }
      if(type){
        newData["type"] = type;
      }
      if(image){
         newData["imgUrl"] = image
      }
      console.log("-------", newData)

      Inventory.update({_id: itemid}, {$set: newData}).exec()
      .then(function(updatedItem){
        Inventory.findById({_id:itemid})
        .then(function(newItem){
          res.status(200).json({
            message: "data updated",
            newItem
          })
        })
        .catch(function(err){
          res.status(400).json(err.message)
        })
      })
      .catch(function(err){
         res.status(400).json(err.message)
      })
   }

   static deleteItem(req,res){
      console.log("masuk delete nih")
      let {id} = req.headers
      console.log("di delete item:", id)
      Inventory.deleteOne({_id: id})
      .then(function(deleted){
         res.status(200).json("item data deleted");
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }

   static searchByType(req,res){
      let {type} = req.body;
      Inventory.find({type: type})
      .then(function(items){
         res.status(200).json(items)
      })
      .catch(function(err){
         res.status(400).json(err.message)
      })
   }

   static searchItem(req,res){
      let {query} = req.body;

      Inventory.find({ $or: [{name : { $regex: query, $options: 'i'}}, {price: {$regex: query , $options: 'i'}}, {type: {$regex: query , $options: 'i'}}]})
      .then(function(tasks){
        
         res.status(200).json({
            message: `Here's a list of items containing the word ${query}`,
            tasks
         })
      })
      .catch(function(err){
         res.status(400).json(err.message)
      })
   }

}

module.exports = InventoryController;