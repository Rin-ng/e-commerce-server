const Cart  = require('../models/shoppingCart');

class CartController{
  
   static getCart(req,res){
      Cart.find({})
      .then(function(items){
         res.status(200).json(items)
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }

   static addItem(req,res){
      let {name, price, qty, type,stockQty, itemid, imgUrl} = req.body;
      Cart.create({
         name,
         price, 
         qty,
         type,
         imgUrl,
         itemid,
         stockQty
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
   static findItem(req,res){
      let {id} = req.body;
      Cart.find({itemid: id})
      .then(function(item){
         console.log("------->>> ", item)
         console.log("~~~~~~========>", item.length)
         if(item.length > 0){
            res.status(200).json({
               message: "found",
               item
            })
         }
         else if(item.length === 0){
            res.status(200).json({
               message: "not found"
            })
         }
      })
      .catch(function(err){
         console.log("~~~~~~________", err.message)
         res.status(400).json(err.message)
      })
   }
   static updateItem(req,res){
      let {qty, itemid} = req.body;

      Cart.update({_id: itemid}, {$set: {qty: qty}}).exec()
      .then(function(updatedItem){
            res.status(200).json({
               message: "data updated",
               updatedItem
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
      Cart.deleteOne({_id: id})
      .then(function(deleted){
         res.status(200).json("item data deleted");
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }

}

module.exports = CartController;