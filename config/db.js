const mongoose=require("mongoose")
const connectDB=async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(()=>{
        console.log("db connected")
    }).catch((error)=>{
        console.log(error);
    })
}
module.exports=connectDB