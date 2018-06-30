var mongoose = require('../');
var { Schema } = require('mongoose');

var rateSchema = mongoose.Schema({
  country: String,
  basic_rate: Number,
  expedited_rate: Number,
  one_day_rate: Number,
  city_code: Number
});

var Rates = mongoose.model('Rates', rateSchema);

module.exports = Rates;