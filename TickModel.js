const mongoose = require('mongoose');

const Tick = mongoose.model('Tick', {
      currencyPair: {type: String, required: true},
      timestamp:    {type: Number, required: true},
      bid:          {type: Number},
      bidPips:      {type: Number},
      offer:        {type: Number},
      offerPips:    {type: Number},
      high:         {type: Number, required: true},
      low:          {type: Number, required: true},
      open:         {type: Number}
});

module.exports = Tick;
