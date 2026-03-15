const db = require("../Model/loginDb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const mail = require("nodemailer");

const transport = mail.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "akhil300596@gmail.com",
    pass: "bgxz huyd vsgn yfyv",
  },
});

exports.signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const checkEmail = await db.findOne({ email });

    if (checkEmail) {
      res.status(400).json({ message: "already user exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    await db.create({ name, email, password: encryptedPassword });

    transport.sendMail({
      to: email,
      subject: "succefully account created",
      text: "hello world",
      html: `<p>hello ${name}</p><p>Welcome to login page yor account is created succefully</p>`,
    });
    res.status(200).json({ message: "account created" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const details = await db.findOne({ email });
    console.log(details);

    console.log(details.email);
    const decryptPassword = bcrypt.compareSync(password, details.password);
    console.log(decryptPassword);
    if (!details) {
      res.status(400).json({ message: "user not exist try to signup" });
    } else if (!decryptPassword) {
      res.status(400).json({ message: "passwpord wrong" });
    }

    let userData = {
      id: details.id,
      // role:details.role
    };
    let token = await jwt.sign(userData, process.env.secretKey, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "succefully loged in", data: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.profile = async (req, res) => {
  let data = req.userDetail;

  res.json({ message: "profile page loaded", data });
};

exports.addrees = async (req, res) => {
  let data = req.userDetail;

  res.json({ message: "address loaded", data });
};

exports.resetPassword = async (req, res) => {
  const { email } = req.params;

  const details = await db.findOne({ email });

  if (!details) {
    res.status(400).json({ message: "user not exist try to signup" });
  }

  let userData = {
    id: details.id,
  };
  let token = await jwt.sign(userData, process.env.secretKey, {
    expiresIn: "10m",
  });

  transport.sendMail({
    to: email,
    subject: "reset password",
    html: `<p>hello ${details.name}</p><a href=http://localhost:3001/resetpassword/${token}>click on link to reset paswword</a>`,
  });

  res.json("sucefully sent to mail");
};

// exports.forgetPassword = async (req, res) => {
//   let { email, password } = req.body;

//   let data = await db.findOne({ email });

//   if (!data) {
//     res.json({ message: "user not existed" });
//   }

//   let hashed = await bcrypt.hash(password, 10);

//   let updatePassword = await db.findByIdAndUpdate(
//     data.id,
//     { password: hashed },
//     { new: true },
//   );
//   // '$2b$10$AxYT6F4NyZsGlx54bJ8nneyKlli4It6DqHrRlStlcFRzPErQeVnMm'
//   // '$2b$10$76pnumk1pChk4VA6jESi3OUBbIeUCGfXmH/DFbUg30DsgmkO3c9F2'
//   res.json({ message: "password updated", data: updatePassword });
// };


exports.forgetPassword = async (req, res) => {

  const {password} = req.body
  const details = req.userDetail
  let hashed = await bcrypt.hash(password, 10);
 
  const data = await db.findByIdAndUpdate(details.id,{password:hashed})

res.json("succefully updated")
}
