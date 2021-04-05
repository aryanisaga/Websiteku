const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/contact.html", function(req, res) {
  res.sendFile(__dirname + "/contact.html");
});

app.get("/belajar.html", function(req, res) {
  res.sendFile(__dirname + "/belajar.html");
});

app.get("/subscribe.html", function(req, res) {
  res.sendFile(__dirname + "/subscribe.html");
});

app.post("/subscribe", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;


  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/52f9123ca2";

  const options = {
    method: "POST",
    auth: "saga:c309150401b81ac05e1ac6a83e75241d-us1"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure.html", function(req, res) {
  res.redirect("/subscribe.html");
});


app.get("/belajar.html", function(req, res) {
  res.sendFile(__dirname + "/belajar.html");
  });

app.post("/tambah", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;

  res.send("The result of the calculate is " + result);
});

app.get("/belajar.html", function(req, res) {
  res.sendFile(__dirname + "/belajar.html");
  });

app.post("/bmicalculator", function(req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var bmi = weight / (height * height);

  res.send("The result of the calculate is " + bmi);
});


app.listen(process.env.PORT || 3000, function() {
  console.log("server is running");
});


// API Key
// 5829adbbd8f214a08e224ebbdb47dc19-us1

// List ID
// 52f9123ca2
