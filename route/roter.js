const express = require("express");
var multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");
const Excell = require("../model/xlsx");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });

const uploadXLSX = async (req, res, next) => {
  // console.log(req.file);
  try {
    let path = req.file.path;
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    // console.log(Object.keys(jsonData[0]));
    if (
      Object.keys(jsonData[0])[0] !== "State" ||
      Object.keys(jsonData[0])[1] !== "District" ||
      Object.keys(jsonData[0])[2] !== "ULB Name" ||
      Object.keys(jsonData[0])[3] !== "TLF Name" ||
      Object.keys(jsonData[0])[4] !== "SLF Name" ||
      Object.keys(jsonData[0])[5] !== "SLF Id" ||
      Object.keys(jsonData[0])[6] !== "Ward Name" ||
      Object.keys(jsonData[0])[7] !== "Slum Name" ||
      Object.keys(jsonData[0])[8] !== "SHG Id" ||
      Object.keys(jsonData[0])[9] !== "SHG Name" ||
      Object.keys(jsonData[0])[10] !== "Date of Formation" ||
      Object.keys(jsonData[0])[11] !== "Account Number" ||
      Object.keys(jsonData[0])[12] !== "Bank Name" ||
      Object.keys(jsonData[0])[13] !== "Bank Branch" ||
      Object.keys(jsonData[0])[14] !== "IFSC Code" ||
      Object.keys(jsonData[0])[15] !== "Phone Number" 
    ) {
      return res
        .status(500)
        .json({ message: "heading not match", success: false });
    }
    // return
    let savedData = await Excell.insertMany(jsonData);

    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
      data: savedData,
    });
  } catch (err) {
    if(err.code === 11000){
      return res.status(500).json({ success: false, message: "Sghid already exist in db" });

    }
    else{
      
      
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};
const router = express.Router();
const {
  register,
  login,
  xlsxget,
  isAuthuser,
  dashboard,
  logout,
  employregister,
  employylogin,
  filterdata,
  uploadform,
  uploadsheet,
  sghidsearch,
  searchsgidwithdist,
  slumidsearch,
  update,
  edit,
} = require("../controllers/auth");
const { STATES } = require("mongoose");

router.route("/adminregister").post(register);
router.route("/employregister").post(employregister);
router.route("/login").post(login);
router.route("/employlogin").post(employylogin);
router.route("/getxlsxfile").post(xlsxget);
router.route("/finddata").post(filterdata);
router.route("/slumidsearch").post(slumidsearch);
router.route("/searchall").post(searchsgidwithdist);
router.route("/uploadForm").post(uploadform);
router.route("/upload").post(upload.single("xlsx"), uploadXLSX);
router.route("/me").get(isAuthuser, dashboard);
router.route("/logout").get(logout);
router.route("/edit").post(edit);
router.route("/update").put(update);

module.exports = router;
