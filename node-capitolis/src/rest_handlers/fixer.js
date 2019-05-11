const request = require("request");
const urlDomain = "http://data.fixer.io/api/";
const FIXER_KEY = "dc04cdc4fe87082387b5c5880e1be475";
let lastTimeFetched, cachedRates;

const getRates = (symbols, callback) => {
  const now = new Date().getTime();
  if (!cachedRates || (lastTimeFetched && now - lastTimeFetched > 100000)) {
    lastTimeFetched = now;
    request(
      {
        json: true,
        url: `${urlDomain}/latest?access_key=${FIXER_KEY}&base=EUR${
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
        const { rates: cachedRates, base } = res.body;
        callback(undefined, { cachedRates, base });
      }
    );
  }
};

module.exports = {
  getRates
};
