const express = require("express");
var multer = require("multer")
const path = require('path')
const XLSX = require('xlsx')
const Excell = require('../model/xlsx')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  var upload = multer({storage:storage})

  const uploadXLSX = async(req, res, next) => {
    console.log(req.file);
    try{
      let path = req.file.path;
      var workbook = XLSX.readFile(path);
      var sheet_name_list = workbook.SheetNames;
      let jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if(jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }
      let savedData = await Excell.insertMany(jsonData);
  
      return res.status(201).json({
        success: true,
        message: savedData.length + " rows added to the database",
        data:savedData
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
const router = express.Router();
const { register, login, xlsxget, isAuthuser, dashboard, logout, employregister, employylogin, filterdata ,uploadform,  uploadsheet, sghidsearch, searchsgidwithdist, slumidsearch} = require("../controllers/auth");

router.route("/adminregister").post(register);
router.route("/employregister").post(employregister);
router.route("/login").post(login);
router.route("/employlogin").post(employylogin);
router.route("/getxlsxfile").get(xlsxget);
router.route("/finddata").post(filterdata);
router.route("/slumidsearch").post(slumidsearch);
router.route("/searchall").post(searchsgidwithdist);
router.route("/uploadForm").post(uploadform);
router.route("/upload").post(upload.single("xlsx"),uploadXLSX);
router.route("/me").get(isAuthuser, dashboard);
router.route("/logout").get(logout);

module.exports = router;
