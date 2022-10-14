const mongoose = require("mongoose");
const form = new mongoose.Schema({
 
  
},{"strict":false});
const newform = mongoose.model("form", form);
module.exports = newform;
