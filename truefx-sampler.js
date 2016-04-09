
// See http://www.truefx.com/dev/data/TrueFX_MarketDataWebAPI_DeveloperGuide.pdf
//   for a full list of valid currency pairs (unauthorized list only)

const request = require('request');
const TRUEFX_URL = 'http://webrates.truefx.com/rates/connect.html?f=csv';

// interval <ms>
(function sampler (interval) {
  interval = interval || 1;
  request(TRUEFX_URL, function (err, res, body) {
    if (err) console.log('sampler error: ', err);
    if (res.statusCode !== 200) console.log('non-success error code: ', res.statusCode);

    console.log(body);
    // let data = parseCsv(body);
    // setDatabase(data);
  });
})();
