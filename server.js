const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const fName = req.body.fName;
  const lName = req.body.lName;
  const emailAdd = req.body.email;

  mailchimp.setConfig({
    apiKey: "c277ffb51439accb509a7571579ae11e-us20",
    // apiKey: "c277ffb51439accb509a7571579ae11e-us",
    server: "us20",
  });

  async function callPing() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

callPing();

  // const listID = "db287a2f81";
  // const subscribingUser = {
  //   firstName: fName,
  //   lastName: lName,
  //   email: emailAdd
  // };
  //
  // async function run() {
  //   const response = await mailchimp.lists.addListMember(listID, {
  //     email_address: subscribingUser.email,
  //     status: "subscribed",
  //     merge_fields: {
  //       FNAME: subscribingUser.firstName,
  //       LNAME: subscribingUser.lastName
  //     }
  //   });
  //
  //   res.send(response);
  // };
  //
  // run();
});

app.listen(3000, function() {
  console.log("Listening to port 3000.");
});
