const express = require("express");
const app = express();
var fs = require("fs");
const { report } = require("process");

const port = process.env.PORT || 4000;

// async function wait(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// }

// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

app.get("/api/v1/generate", async (req, res) => {
  var gen = require("./writer/program");

  res.status(200).json({
    message: "Generate Report successfully",
    status: 200,
    link: req.protocol + "://" + req.get("host") + "/download",
  });
});

app.get("/api/v1/report", async (req, res) => {
  var gen = require("./reader/program");
  var data = fs.readFileSync("./output/result.txt", "utf8");

  res.status(200).json({
    message: "Report created successfully",
    status: 200,
    result: data,
  });
});

app.get("/download", (req, res) => {
  res.download("./output/output.txt");
});

app.listen(port, () => {
  console.log(`===== Server listening on port ${port} =====`);
});
