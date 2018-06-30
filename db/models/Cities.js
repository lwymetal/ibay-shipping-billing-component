var mongoose = require('../');
var { Schema } = require('mongoose');

var citySchema = mongoose.Schema({
  country: String,
  city_code: Number
});

var Cities = mongoose.model('Cities', citySchema);

module.exports = Cities;