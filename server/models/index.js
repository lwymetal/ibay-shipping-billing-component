const db = require('../../db/config');

const Models = {

  get: function(params, cb) {
    db.query(`select * from rates where city_code="${params.citycode}"`, (err, results) => {
      if (!results[0]) { cb(err) } else {
        if (params.country === 'United States of America') {
          +params.zipcode > 79999 ? (results[0].basic_rate += 2, results[0].expedited_rate += 3, results[0].one_day_rate += 4) :
            +params.zipcode > 49999 ? (results[0].basic_rate += 1, results[0].expedited_rate += 2, results[0].one_day_rate += 3) :
              {};
        }
      }
      cb(null, results[0]);
    })
  },

  // Webpage interface:
  // post: function(params, cb) {
  //   var queryStr = 'insert into rates (country, basic_rate, expedited_rate, one_day_rate, city_code) values (?)';
  //   db.query(queryStr, params, (err, results) => {
  //     cb(err, results);
  //   });
  // },

  // Raw API call:
  post: function(params, cb) {
    var queryStr = `insert into rates (country, basic_rate, expedited_rate, one_day_rate, city_code) values ('${params.query.country}', ${params.query.basic_rate}, ${params.query.expedited_rate}, ${params.query.one_day_rate}, ${params.query.city_code})`;
    db.query(queryStr, (err, results) => {  
      err ? console.log(err) : cb(null, results);
    });
  },

  put: function(params, newData, cb) {
    var queryStr = `update rates set (basic_rate, expedited_rate, one_day_rate) values (${newData[0]}, ${newData[1]}, ${newData[2]}) where city_code=${params}`; 
    db.query(queryStr, params, (err, results) => {
      cb(err, results);
    });
  },
  delete: function(params, cb) {
    var queryStr = `delete from rates where city_code=${params}`;
    db.query(queryStr, params, (err, results) => {
      cb(err, results);
    });
  },

}

module.exports = Models;
