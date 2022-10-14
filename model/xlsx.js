const mongoose=require("mongoose")
const xlsxData=new mongoose.Schema({
    sno: {
        type: String,
      },
},{"strict":false});  
const excel=mongoose.model("xlsx",xlsxData);
module.exports=excel