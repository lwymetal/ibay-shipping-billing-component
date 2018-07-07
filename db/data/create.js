const fs = require('fs');
// const db = require('../config');
const stream = fs.createWriteStream(__dirname + '/rates.csv');
const { seeds } = require('../data/seed');
const exec = require('child_process').exec;

var startScript = new Date();

exec('mysql -u root < db/sql/schema.sql');

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

var endScript; 

var makeTable = async function() {
  for (var i = 0; i < 104; i++) {  
    console.log(i);
    await stream.write(sprout());
  }
  endScript = new Date();
  console.log(((endScript - startScript) / 1000) + ' seconds');
}

makeTable();