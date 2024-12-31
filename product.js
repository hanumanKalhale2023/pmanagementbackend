const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productId:Number,
    productName:String,
    productPrice:Number,
    productStock:Number,
})
module.exports=mongoose.model("Product",productSchema);