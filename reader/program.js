var fs = require("fs");
const { result } = require("lodash");
var _ = require("lodash");

var contentArr = [];
var totalResult = [];
var evaluatedArr = [];
var countTotalAlphanumeric = [];
var countTypeAlphanumeric = [];

var countTotalInteger = [];
var countTypeInteger = [];

var countTotalAlphabetical = [];
var countTypeAlphabetical = [];

var countTotalRealNumber = [];
var countTypeRealNumber = [];

// evaluator object to chain the methods
var evaluator = {
  type: null,
  evaluatee: null,
  result: [],
  countisAlphabeticString: 0,
  countisRealNumber: 0,
  countisInteger: 0,
  countisAlphaNumeric: 0,

  isAlphaNumeric: function (str) {
    var evaluatee = (this.evaluatee = !str
      ? this.evaluatee.trim()
      : str.trim());
    var code, i, len;

    for (i = 0, len = evaluatee.length; i < len; i++) {
      code = evaluatee.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)

        return this;
      }
    }
    this.type = "Alphanumerics";
    this.countisAlphaNumeric++;
    // this.result = evaluatee + " - " + this.type + "," + this.countisAlphaNumeric;
    this.result = this.countisAlphaNumeric + "-" + this.type;
    countTotalAlphanumeric.push(this.countisAlphaNumeric);
    countTypeAlphanumeric.push(this.type);
    return this;
  },

  isInteger: function (str) {
    var evaluatee = (this.evaluatee = !str ? this.evaluatee : str);
    var isInt = evaluatee % 1 === 0;

    if (isInt) {
      this.type = "Integer";
      this.countisInteger++;
      // this.result = evaluatee + " - " + this.type + this.countisInteger;
      this.result = this.countisInteger + "-" + this.type;
      countTotalInteger.push(this.countisInteger);
      countTypeInteger.push(this.type);
      return this;
    } else {
      return this;
    }
  },

  isRealNumber: function (str) {
    var evaluatee = (this.evaluatee = !str ? this.evaluatee : str);
    if (!isNaN(parseFloat(evaluatee)) && isFinite(evaluatee)) {
      this.type = "Real numbers";
      this.countisRealNumber++;
      // this.result = evaluatee + " - " + this.type + this.countisRealNumber;
      this.result = this.countisRealNumber + "-" + this.type;
      countTotalRealNumber.push(this.countisRealNumber);
      countTypeRealNumber.push(this.type);
      return this;
    } else {
      return this;
    }
  },

  isAlphabeticString: function (str) {
    var evaluatee = (this.evaluatee = !str ? this.evaluatee : str);
    var alphabetical = /^[a-zA-Z()]+$/.test(evaluatee);
    if (alphabetical) {
      this.type = "Alphabetical strings";

      this.countisAlphabeticString++;
      // this.result =  evaluatee + " - " + this.type + this.countisAlphabeticString;
      this.result = this.countisAlphabeticString + "-" + this.type;
      countTotalAlphabetical.push(this.countisAlphabeticString);
      countTypeAlphabetical.push(this.type);

      return this;
    } else {
      return this;
    }
  },
};

fs.readFile("./output/output.txt", "utf8", function (err, content) {
  if (err) throw console.error("Error writing output", err);

  contentArr = content.split(",");

  _.forEach(contentArr, function (item) {
    var result = evaluator
      .isAlphaNumeric(item)
      .isAlphabeticString()
      .isRealNumber()
      .isInteger();
    evaluatedArr.push(result.result);
  });
  const space = " : "

  const totalAlphanumeric = countTotalAlphanumeric.slice(-1);
  const totalTypeAplhanumeric = countTypeAlphanumeric[0];

  const totalInteger = countTotalInteger.slice(-1);
  const totalTypeInteger= countTypeInteger[0];

  const totalAlphabetical = countTotalAlphabetical.slice(-1);
  const totalTypeAplhabetical = countTypeAlphabetical[0];

  const totalRealNumber = countTotalRealNumber.slice(-1);
  const totalTypeRealNumber = countTypeRealNumber[0];


  const resultALphanumeric = (totalTypeAplhanumeric.concat(space, totalAlphanumeric))
  const resultInteger = (totalTypeInteger.concat(space, totalInteger))
  const resultALphabetical = (totalTypeAplhabetical.concat(space, totalAlphabetical))
  const resultRealNumber = (totalTypeRealNumber.concat(space, totalRealNumber))

  console.log(resultALphabetical)
  console.log(resultInteger)
  console.log(resultALphanumeric)
  console.log(resultRealNumber)

  var hasil = [
    resultALphanumeric,
    resultInteger,
    resultALphabetical,
    resultRealNumber,
  ]
  totalResult.push(hasil)
  

  fs.writeFile("./output/result.txt", totalResult, function (err, content) {
    if (err) throw console.error("Error writing evaluation", err);
    console.log("It's evaluated in /output/result.txt!");
  });
});
