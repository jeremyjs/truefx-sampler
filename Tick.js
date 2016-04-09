
module.exports = function Tick (obj) {
  if (Array.isArray(obj)) {
    return {
      currencyPair: obj[0],
      timestamp:    obj[1],
      bid:          obj[2],
      bidPips:      obj[3],
      offer:        obj[4],
      offerPips:    obj[5],
      high:         obj[6],
      low:          obj[7],
      open:         obj[8]
    };
  }

  return {};
}
