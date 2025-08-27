import { Cart } from "../models/Cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const addToCart = asyncHandler(async(req , res)=>{
    const {productId , quantity=1} = req.body
    const userID = req.user._id


  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let cart = await Cart.findOne({user: userID })

  if (!cart) {
       cart = await Cart.create({
        user:userID,
        items:[{ product: productId, quantity }]
      })
  }else{
    const itemIndex = cart.items.findIndex(item=>item.product.toString() ===productId)
    
    if (itemIndex>-1) {
        cart.items[itemIndex].quantity += quantity
        if (cart.items[itemIndex].quantity < quantity) {
              cart.items[itemIndex].quantity = 1;  // for preventing negative quantify
        }
    }else{
      cart.items.push({ product: productId, quantity });
    }
      await cart.save();
} 

   await  cart.populate("items.product" , "name price image")
  
    res.status(200)
    .json(new ApiResponse(200 , cart , "added to cart succesafully"))

})


 const getCart = asyncHandler(async (req, res) => {
  
  const cart = await Cart.findOne({ user:req.user._id })
  .populate('items.product', 'name price image')
  console.log(cart);
  res.status(200)
  .json(new ApiResponse(200 , cart , "fetch cart successfully"))
 })



export {addToCart , getCart}