var mongoose = require('mongoose');
var { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost/ibay');

var sampleSchema = mongoose.Schema({
  name: String,
  secret: String
})

var sampleModel = mongoose.model('sample', sampleSchema);

var sampleModelInstance = new sampleModel({ name: 'abc', secret: 'text'});

sampleModelInstance.save()
  .then( () => {
    console.log('MongoDB connected');
  })
  .catch( () => {
    console.log('DB connection error');
  })

module.exports = mongoose;