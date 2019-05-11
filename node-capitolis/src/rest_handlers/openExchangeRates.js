const request = require("request");
const urlDomain = "https://openexchangerates.org/api/";
const APP_ID = "d74f80f472814b1c96f4d7ec79458bc6";
let lastTimeFetched, cachedRates;

const getRates = (symbols, callback) => {
  const now = new Date().getTime();
  if (!cachedRates || (lastTimeFetched && now - lastTimeFetched > 1000000)) {
    lastTimeFetched = now;
    request(
      {
        json: true,
        url: `${urlDomain}/latest.json?app_id=${APP_ID}&base=USD${
          symbols ? `&symbols=${symbols.join(",")}` : ""
        }`
      },
      (err, res) => {
        if (err) {
          return callback("Unable to connect to fixer.");
        }
        if (res.statusCode != 200) {
          return callback(res.error);
        }
        const { rates, base } = res.body;
        callback(undefined, { rates, base });
      }
    );
  }
};

module.exports = {
  getRates
};
