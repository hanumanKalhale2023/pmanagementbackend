const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.set('view engine','ejs')
const userModel=require('./Database');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
bodyParser.urlencoded({extended:true})
const pmodel=require('./product')

app.use("/",express.static("./node_modules/bootstrap/dist/"));

app.get("/",(req,res)=>{
    res.render('pages/login')
})
app.get("/login",(req,res)=>{
    res.render('pages/login')
})
app.post('/signupData',async (req,res)=>{
    
    try{
        const data=new userModel(req.body);
        if(data.userName===""){
            res.status(404).josn({message:"value should not be empty"})
        }
        else{
            await data.save()
           res.status(200).json({message:"signup successfull"})
        }
        
    }catch(error){
        res.status(404).json({message:'Error to Signup'})
    }
})
app.post('/loginData', async (req,res)=>{

    try{
        const data=req.body;
        const updatedata=await userModel.findOne({userName:data.userName})
        if(!updatedata){
            res.status(404).json({message:"Please enter valid userName and Password"})
        }
        else if(data.userName===updatedata.userName && data.password===updatedata.password){
            res.render('pages/home')
        }
        else(
            res.status(404).json("Invalid password ")
        )
        
        

    }catch(error){
        res.status(404).json({message:"Not Valid User"})
    }
})
app.get('/signup',(req,res)=>{
    res.render('pages/signup')
})

// <----------------------------------Testing Purposes------------------------------>

app.post('/add',async (req, res) => {
    try {
        const data = new pmodel(req.body);
        await data.save();
        res.status(200).json({message:"Product Added"});
    }
    catch (error){
        res.status(500).send({message:"Something went wrong"})
    }
})

//get data from database
app.get('/get', (req,res)=>{
    res.render('pages/get' , {data:null})
})
app.get('/find', async (req,res)=>{
    try{
        const data= await pmodel.find()
        if(!data){
            res.status(300).json({message:"Records are not available"})
        }
        else{
            res.render('pages/get', {data})
        }
      
    }catch(error){

    }
})
//delete record
app.get('/delete', (req,res)=>{
    res.render('pages/delete', )
})
app.post('/delete-product', async (req,res)=>{
    const name=req.body.productName;
    console.log(name)

    try{
        const data=await pmodel.findOneAndDelete({productName:name})
        if(!data){
            res.status(404).json('product not find to delete')
        }
        res.status(200).json("product deleted successfully")
    }catch(error){
        res.status(404).json("internal error")
    }
})

//update the product by productName

app.get('/update', (req,res)=>{
    res.render('pages/update')
})
app.post('/update-record', async (req,res)=>{
    const data= req.body;
    try{
        const updated=await pmodel.findOneAndUpdate({productName:data.productName},{$set:req.body},{new:true});
        if(!updated){
            res.status(404).json({message:"data not updated"})
        }
        res.status(200).json({message:"data Updated successfully"})
    }catch(error){
        res.status(404).json({message:"internal error"})
    }
})


//<-----------------------------------
app.listen(3000,()=>{
    console.log('server is running')
})
