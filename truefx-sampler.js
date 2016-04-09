
// See http://www.truefx.com/dev/data/TrueFX_MarketDataWebAPI_DeveloperGuide.pdf
//   for a full list of valid currency pairs (unauthorized list only)

const request = require('request');
const csv = { parse: require('csv-parse') };
const Tick = require('./Tick');
const TRUEFX_URL = 'http://webrates.truefx.com/rates/connect.html?f=csv';
const CSV_OPTIONS = {
  skip_empty_lines: true,
  trim: true,
  comment: '\r',
};

// interval <ms>
(function sampler (interval) {
  interval = interval || 1;
  request(TRUEFX_URL, function (err, res, body) {
    if (err) {
      console.log('sampler error: ', err);
      return;
    }

    if (res.statusCode !== 200) {
      console.log('non-success error code: ', res.statusCode);
      return;
    }

    console.log(body);

    csv.parse(body, CSV_OPTIONS, function (err, rows) {
      if (err) {
        console.log('csv parse error: ', err);
        return;
      }

      console.log('rows: ', rows);

      const ticks = rows.map(Tick);

      console.log('ticks: ', ticks);

      // setDatabase(ticks);
    });
  });
})();
