const request = require("request");
const urlDomain = "http://data.fixer.io/api/";
const FIXER_KEY = "dc04cdc4fe87082387b5c5880e1be475";
// const SYMBOLS = ['USD','MXN','ILS']

// const convert = ({ from, to, amount }, callback) => {
//   request(
//     {
//       json: true,
//       url: `${urlDomain}/latest?access_key=${FIXER_KEY}&from=${from}&to=${to}&amount=${amount}`
//     },
//     (err, res) => {
//       if (err) {
//         return callback("Undable to get data fom fixer api");
//       }
//       if (res.statusCode !== 200) {
//         return callback(err);
//       }
//       console.log(res.body);
//     }
//   );
// };

const getRates = (symbols, callback) => {
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
      const { rates, base } = res.body;
      callback(undefined, { rates, base });
    }
  );
};
//console.log(res.body);
// let { temperature, precipProbability } = res.body.currently;
// let { summary } = res.body.daily;
// callback(undefined, {
//   temperature,
//   precipProbability,
//   summary,
//   address
// });
//     }
//   );
// };

module.exports = {
  getRates
};
