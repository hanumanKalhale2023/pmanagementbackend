const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://khanumant2023:hanumant@cluster0.u6riy.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")

const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    password:String
})
module.exports=mongoose.model("User",userSchema);