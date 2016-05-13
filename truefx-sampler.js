
// See http://www.truefx.com/dev/data/TrueFX_MarketDataWebAPI_DeveloperGuide.pdf
//   for a full list of valid currency pairs (unauthorized list only)

const mongoose = require('mongoose');
const request = require('request');
const csv = { parse: require('csv-parse') };
const Tick = require('./Tick');
const TickModel = require('./TickModel');
const config = require('./config');
const TRUEFX_URL = 'http://webrates.truefx.com/rates/connect.html?f=csv';
const CSV_OPTIONS = {
  skip_empty_lines: true,
  trim: true,
  comment: '\r',
};

mongoose.connect(config.db_url);

// interval <ms>
// if interval is not provided, will run once
(function sampler () {
  const interval = process.argv[2];
  if (interval === undefined) sample();
  else                        setInterval(sample, interval);
})();

function sample () {
  request(TRUEFX_URL, function (err, res, body) {
    if (err) {
      console.log('sampler error: ', err);
      return;
    }

    if (res.statusCode !== 200) {
      console.log('non-success error code: ', res.statusCode);
      return;
    }

    csv.parse(body, CSV_OPTIONS, function (err, rows) {
      if (err) {
        console.log('csv parse error: ', err);
        return;
      }

      const ticks = rows.map(Tick);

      ticks.forEach(function (tick) {
        const query = {currencyPair: tick.currencyPair, timestamp: tick.timestamp};
        TickModel.findOneAndUpdate(query, tick, {upsert: true}, function (err, res) {
          if (res === null) console.log(tick.timestamp, tick.currencyPair, tick.offer, tick.offerPips, tick.bid, tick.bidPips);
          if (err) console.error('Error on save:', err);
        });
      });
    });
  });
};
