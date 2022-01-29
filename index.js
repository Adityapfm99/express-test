const express = require("express");
const app = express();
var fs = require("fs");

const port = process.env.PORT || 4000;

app.get("/", async (req, res) => {
  res.end("Programming Challenge")
});

app.get("/api/v1/generate", async (req, res) => {
  try {
    var gen = require("./writer/program");
    res.status(200).json({
      message: "Generate txt successfully, It's saved in /output/output.txt",
      status: 200,
      link: req.protocol + "://" + req.get("host") + "/download",
    });
  } catch (err) {
    next(err);
  }
});

app.get("/api/v1/report", async (req, res) => {
  try {
    var gen = require("./reader/program");
    var data = fs.readFileSync("./output/result.txt", "utf8");
    res.status(200).json({
      message: "Total number of each random objects",
      status: 200,
      result: data,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/download", (req, res) => {
  res.download("./output/output.txt");
});

app.listen(port, () => {
  console.log(`===== Server listening on port ${port} =====`);
});
