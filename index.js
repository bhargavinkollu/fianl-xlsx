const express = require("express");
const UploadFormData = require("./model/Form");

const Excell = require("./model/xlsx");
var multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectDB = require("./config/db");
const bodyparser = require("body-parser");
const cookiesparser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(cors());
app.use(cookiesparser());
app.use(bodyparser.urlencoded({ extended: true }));
//connect router
app.use("/api/auth", require("./route/roter"));

// --------------------------deployment------------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
("hi");

// --------------------------deployment------------------------------

// app.post("/edit", async (req, res) => {
//   let uid = req.body.id;
//   // console.log(req);
//   let data = await Excell.findById({ _id: uid });
//   // console.log(data);
//   return res.json(data);
// });
// app.put("/update", async (req, res) => {
//   let objid = req.body._id;
//   let data = req.body;
//   // console.log(data);

//   // const {"Name of the District","Name of the ULB"}=req.body
//   // console.log(data["Name of the District"]);

//   let updatadata = await Excell.findByIdAndUpdate(objid, {
//     ["State"]: data["State"],
//     ["District"]: data["District"],
//     ["ULB Name"]: data["ULB Name"],
//     ["TLF Name"]: data["TLF Name"],
//     ["SLF Name"]: data["SLF Name"],
//     ["SLF ID"]: data["SLF ID"],
//     ["Ward Name"]: data["Ward Name"],
//     ["Slum Name"]: data["Slum Name"],
//     ["SHG Id"]: data["SHG Id"],
//     ["SHG Name"]: data["SHG Name"],
//     ["Date of Formation"]: data["Date of Formation"],
//     ["Account Number"]: data["Account Number"],
//     ["Bank Name"]: data["Bank Name"],
//     ["Bank Branch"]: data["Bank Branch"],
//     ["IFSC Code"]: data["IFSC Code"],
//     ["Phone Number"]: data["Phone Number"],
   
//   });
//   // console.log(updatadata);
//   res.json({ success: "update" });
// });

app.post("/deleteclient", async (req, res) => {
  const user = await UploadFormData.deleteMany()

  return res.json(user);
});
app.delete("/deleteclientxlsx",async(req,res)=>{
  
})
app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});