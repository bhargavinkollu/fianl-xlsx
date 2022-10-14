const express = require("express");

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
const fs = require("fs");
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

app.post("/edit", async (req, res) => {
  let uid = req.body.id;
  // console.log(req);
  let data = await Excell.findById({ _id: uid });
  // console.log(data);
  return res.json(data);
});
app.put("/update", async (req, res) => {
  let objid = req.body._id;
  let data = req.body;
  console.log(data);

  // const {"Name of the District","Name of the ULB"}=req.body
  console.log(data["Name of the District"]);

  let updatadata = await Excell.findByIdAndUpdate(objid, {
    ["Name of the District"]: data["Name of the District"],
    ["Name of the ULB"]: data["Name of the ULB"],
    ["TLF Name"]: data["TLF Name"],
    ["TLF ID"]: data["TLF ID"],
    ["SLF Name"]: data["SLF Name"],
    ["SLF ID"]: data["SLF ID"],
    ["ward Name"]: data["ward Name"],
    ["slum name"]: data["slum name"],
    ["Slum Id"]: data["Slum Id"],
    ["SHG ID"]: data["SHG ID"],
    ["SHG Name"]: data["SHG Name"],
    ["Date Of Formation"]: data["Date Of Formation"],
    ["caste"]: data["caste"],
    ["SB Account No"]: data["SB Account No"],
    ["Bank name"]: data["Bank name"],
    ["Branch"]: data["Branch"],
    ["IFSC Code"]: data["IFSC Code"],
    ["SHG Member Name"]: data["SHG Member Name"],
    ["Member ID"]: data["Member ID"],
    ["Cell No"]: data["Cell No"],
    ["Father / Husband Name"]: data["Father / Husband Name"],
    ["aadharNo"]: data["aadharNo"],
    ["Mobile Numbe"]: data["Mobile Numbe"],
    ["membercaste"]: data["membercaste"],
    ["AGE"]: data["AGE"],
    ["Member status"]: data["Member status"],
  });
  console.log(updatadata);
  res.json({ success: "update" });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
