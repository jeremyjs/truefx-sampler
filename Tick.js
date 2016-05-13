
module.exports = function Tick (obj) {
  if (Array.isArray(obj)) {
    return {
      currencyPair: obj[0],
      timestamp:    Number(obj[1]),
      bid:          Number(obj[2]),
      bidPips:      Number(obj[3]),
      offer:        Number(obj[4]),
      offerPips:    Number(obj[5]),
      high:         Number(obj[6]),
      low:          Number(obj[7]),
      open:         Number(obj[8])
    };
  }

  return {};
}
