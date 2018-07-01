const fs = require('fs');
const db = require('mongoose');
const stream = fs.createWriteStream(__dirname + '/rates.csv');
const { seeds } = require('../data/seed');
const exec = require('child_process').exec;

var makeCode = function() {
  var num = Math.floor(Math.random() * 1000000000000);
  while (num < 99999999999) { num *= 10 };
  return num + '\n';
}

var sprout = function() {
  var garden = '';
  seeds.forEach(function(seed) { 
    for (var i = 0; i < 500; i++) {
      for (var key in seed) {
        garden += (seed[key] + ',');
      }
       garden += makeCode();
    }
  });
  return garden;
}

for (var i = 0; i < 104; i++) { 
  console.log(i);
  stream.write(sprout());
}
stream.end();

exec('mongoimport -d ibay -c rates --file db/data/rates.csv --type=csv -f country,basic_rate,expedited_rate,one_day_rate,city_code', (err, stdout, stderr) => {
   err ? console.error(`Exec error: ${err}`) : console.log(`Data import successful`);
});

exec('mongo ibay --eval \'db.rates.aggregate([{$project: { _id : 0, basic_rate: 0, expedited_rate: 0, one_day_rate:0}}, {$out: \"asdf\"}])\'', (err, stdout, stderr) => {
  err ? console.error(`Exec error: ${err}`) : console.log(`Aggregate successful`);
});

exec('mongo ibay --eval \'db.rates.update({}, {"$unset": {"country": 1}}, false, true)\'', (err, stdout, stderr) => {
  err ? console.error(`Exec error: ${err}`) : console.log(`Trim successful`);
});
