const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_TOKEN = 'iNotebook@2022';

let success = false;

//ROUTE 1 => Create a user using: POST '/api/auth/signup
router.post(
  "/signup",
  [
    body("email", "Enter valid email address").isEmail(),
    body("password", "Enter atleast 6 characters.").isLength({ min: 6 }),
  ],
  async (req, res) => {
    //If there are error(s), return bad request status and error(s)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //Check if user exist or not.
    try {
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status("400").json({ success, error: "User already exists." });
      } else {
        //Creating a new user.
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPassword,
        });
        //Creating JWT Token
        const data = {
          user: {
            id: user.id
          }
        }
        const authToken = jwt.sign(data, JWT_TOKEN);
        success = true;
        res.json({success, authToken});
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 2 => Authenticate a user using: POST '/api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter valid email address").isEmail(),
    body("password", "Enter a valid password.").exists()
  ],
  async (req, res) => {
    //If there are error(s), return bad request status and error(s) || Login Not Required
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const {email, password} = req.body;
    //Check if user exist or not. || Login Not Required
    try {
      let user = await User.findOne({email});
      if (!user) {
        return res.status("400").json({ success, error: "User doesn't exist." });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        const data = {
          user: {
            id: user.id
          }
        }
        const authToken = jwt.sign(data, JWT_TOKEN);
        success = true;
        res.json({success, authToken});
      }else{
        success = false;
        return res.status("400").json({ success, error: "Incorrect credentials." });
      }

    } catch (error) {
      console.error(error.message);
      success = false;
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3 => Get loggedin user details using: POST '/api/auth/getuser || Login Required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  } 
})
module.exports = router;
