const mongoose = require("mongoose");
const xlsxData = new mongoose.Schema({
  State: {
    type: String,
    require: true,
    
  },
  District: {
    type: String,
    require: true,
  },
  "ULB Name": {
    type: String,
    require: true,
  },
  "TLF Name": {
    type: String,
    require: true,
  },
  "SLF Name": {
    type: String,
    require: true,
  },
  "SLF Id": {
    type: String,
    require: true,
  },
  "Ward Name": {
    type: String,
  },
  "Slum Name": {
    type: String,
    require: true,
  },
  "SHG Id": {
    type: String,
    require: true,
  },
  "SHG Name": {
    type: String,
    require: true,
  },
  "Date of Formation": {
    type: String,
    require: true,
  },
  "Account Number": {
    type: String,
    require: true,
  },
  "Bank Name": {
    type: String,
  },
  "Bank Branch": {
    type: String,
    require: true,
  },
  "IFSC Code": {
    type: String,
    require: true,
  },
  "Phone Number": {
    type: String,
    require: true,
  },

});
const excel = mongoose.model("xlsx", xlsxData);
module.exports = excel;
