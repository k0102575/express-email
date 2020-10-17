/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('/');
});

router.post('/', (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_URL,
      pass: process.env.FROM_PASS,
    },
  });

  let mailOptions = {
    from: process.env.FROM_URL,
    to: process.env.TO_URL,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else {
      res.json({ result: true });
    }
  });
});

module.exports = router;
