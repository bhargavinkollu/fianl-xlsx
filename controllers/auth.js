const catchAsyncerror = require("../middleware/catchAsyncerror");
const emailValidator = require("deep-email-validator");
const User = require("../model/User");
const Employy = require("../model/employuser");
const jwt = require("jsonwebtoken");
const Excell = require("../model/xlsx");
const UploadFormData = require("../model/Form");
const path = require("path");
const { log } = require("console");

async function isEmailValid(email) {
  return emailValidator.validate(email);
}

exports.employregister = catchAsyncerror(async (req, res, next) => {
  console.log(req.body);
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json("plese fill all input ");
  }
  if (password.length < 8) {
    return res.status(400).json("password must be 8 character long");
  }
  try {
    User.findOne({ email }, async (err, user) => {
      const { valid, reason, validators } = await isEmailValid(email);
      // console.log(validators);

  if (user) {
        return res.status(500).json("user already registered");
      } else {
        const userData = await Employy.create({
          email,
          password,
          role,
        });

        sendToken(userData, 201, res);
      }
      return;
    });
  } catch (error) {
    console.log(error.message);
  }
});
exports.register = catchAsyncerror(async (req, res, next) => {
  console.log(req.body);
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json("plese fill all input ");
  }
  if (password.length < 8) {
    return res.status(400).json("password must be 8 character long");
  }
  try {
    User.findOne({ email }, async (err, user) => {
      const { valid, reason, validators } = await isEmailValid(email);
      // console.log(validators);
      if (user) {
        return res.status(500).json("user already registered");
      } else {
        const userData = await User.create({
          email,
          password,
          role: "admin",
        });

        sendToken(userData, 201, res);
      }
      return;
    });
  } catch (error) {
    console.log(error.message);
  }
});
exports.employylogin = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("plz fill all input");
    }
    const user = await Employy.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
      return res.status(500).json("invalid credentials user not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("password is not valid please register");
    }
    // res.status(201).json(user)

    sendToken(user, 200, res);
  } catch (error) {
    throw new Error(error);
  }
});
exports.login = catchAsyncerror(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("plz fill all input");
    }
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
      return res.status(500).json("invalid credentials user not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json("password is not valid please register");
    }
    // res.status(201).json(user)

    sendToken(user, 200, res);
  } catch (error) {
    throw new Error(error);
  }
});

exports.xlsxget = catchAsyncerror(async (req, res, next) => {
  const data = await Excell.find({}, { __v: 0 });
  return res.status(200).json(data);
});

exports.filterdata = catchAsyncerror(async (req, res, next) => {
  const sghid = req.body;
  console.log(sghid);
  const data = await Excell.findOne(sghid);
  return res.status(200).json(data);
});
exports.slumidsearch = catchAsyncerror(async (req, res, next) => {
  const sghid = req.body
  console.log(sghid);
  const data = await UploadFormData.find(sghid,{_id:0,__v:0});
  // console.log(data);
  // const data = await UploadFormData.find();

  return res.status(200).json(data);
 
});
exports.searchsgidwithdist = catchAsyncerror(async (req, res, next) => {
  let reqdata=req.body
  console.log(reqdata);
  const data = await UploadFormData.find(reqdata,{_id:0,__v:0});
  // console.log(data);
  return res.status(200).json(data);
});
exports.uploadform = catchAsyncerror(async (req, res, next) => {
  let data = req.body.data;
  let sgid = data[0]["SHG ID"];
  console.log(data[0]["year"]);

  try {
    const user = await UploadFormData.findOne({ "SHG ID": sgid });
    const year = await UploadFormData.findOne({
      sghid: sgid,
      year: data[0]["year"],
    });
    console.log(user);
    if (data[0]["year"] === undefined) {
      return res
        .status(500)
        .json({ message: "plz enter year", success: false });
    }
    if (year) {
      return res
        .status(500)
        .json({ message: "already Sghid with same year", success: false });
    }
    if (user === "") {
      return res
        .status(500)
        .json({ message: "Sghid already exist", success: false });
    } else {
      let savedData = await UploadFormData.insertMany(req.body.data);
      return res
        .status(201)
        .json({ message: "data upload successfull", success: true });
    }
    // });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
exports.logout = catchAsyncerror(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.isAuthuser = catchAsyncerror(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  } else {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  }
});
exports.dashboard = catchAsyncerror(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "plese login to access this resource" });
  }

  const user = await User.findById(req.user.id);

  res.status(200).json({
    sucess: true,
    user,
  });
});

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  // option for cookie
  const options = {
    expire: new Date(Date.now + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
