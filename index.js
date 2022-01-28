const express = require("express");
const app = express();
var fs = require("fs");
var stream = require('stream');
var _ = require("lodash");
const { report } = require("process");

const port = 4000;

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get("/generate", async (req, res) => {
  var gen = require("./writer/program");


  res.status(200).json({
    message: "Generate Report successfully",
    status: 200,
    link: req.protocol + '://' + req.get('host') + "/download",
  });
});

app.get("/report", async (req, res) => {
  var gen = require("./reader/program");
  var data = fs.readFileSync("./output/result.txt", "utf8");

  res.status(200).json({
    message: "Report created successfully",
    status: 200,
    result: data,
  });
}); 


app.get("/download", (req, res) => {
  res.download('./output/output.txt');
});

app.listen(port, () => {
  console.log(`===== Server listening on port ${port} =====`);
});
