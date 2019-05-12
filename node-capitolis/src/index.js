const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// free currency exchange api
const openExchangeRates = require("./rest_handlers/openExchangeRates");
const financialUnitsComposer = require("./rest_handlers/financialUnitsComposer");
const PORT = 8080;
const DATA = {};
let server, countFilesToLoad;
let countFilesLoaded = 0;
let dataDir = path.join(__dirname, "../data");

let app = express();

// read data file from directory
// when files done loading read them as the data of server
// after adding to server start express listener
fs.readdir(dataDir, (err, items) => {
  if (err) {
    return console.log(err);
  }
  countFilesToLoad = items.length;
  for (var i = 0; i < countFilesToLoad; i++) {
    const [name, extention] = items[i].split(".");
    fs.readFile(path.join(dataDir, `./${items[i]}`), (err, data) => {
      const json = JSON.parse(data.toString());
      for (let key in json) {
        DATA[key] = json[key];
      }
      countFilesLoaded++;
      if (countFilesLoaded == countFilesToLoad) startServer();
    });
  }
});

// when you start the server you get the most current rates from external Api
const startServer = () => {
  financialUnitsComposer.buildFinUnits(DATA);
  server = app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT} /'`);
  });
};

// support CORS
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET ,POST , OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.get("/rates", (req, res) => {
  let { symbols } = req.query;
  symbols = symbols || "";
  openExchangeRates.getRates(symbols.split(","), (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/positions", (req, res) => {
  res.status(200).send(DATA.positions);
});

app.get("/financial_units", (req, res) => {
  res.status(200).send(DATA.finUnits);
});

app.get("/financial_unists_positions", (req, res) => {
  openExchangeRates.getRates([], (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      let result = financialUnitsComposer.getFinancialUnitsPositions(
        DATA.positions,
        DATA.finUnits,
        data.rates
      );
      res.status(200).send(result);
    }
  });
  // todo: external service
});
