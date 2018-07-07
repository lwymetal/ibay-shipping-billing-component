const db = require('../../db/config');

const Models = {

  get: function(params, cb) {
    var rCode;
    db.query(`select * from rates where city_code="${params.city_code}"`, (err, results) => {
      err ? console.log(err) : cb(null, results[0]);
    })
  },

  post: function(params, cb) {
    var queryStr = 'insert into rates (city_code, basic_rate, expedited_rate, one_day_rate) values (?); insert into countries (city_code, country) values(?)';
    db.query(queryStr, params, (err, results) => {
      cb(err, results);
    });
  },
  put: function(params, newData, cb) {
    var queryStr = `update rates set (basic_rate, expedited_rate, one_day_rate) values (${newData[0]}, ${newData[1]}, ${newData[2]}) where city_code=${params}; update cities set country=${JSON.stringify(newData[3])} where city_code=${params}`; 
    db.query(queryStr, params, (err, results) => {
      cb(err, results);
    });
  },
  delete: function(params, cb) {
    var queryStr = `delete from rates where city_code=${params}; delete from cities where city_code=${params}`;
    db.query(queryStr, params, (err, results) => {
      cb(err, results);
    });
  },

}

module.exports = Models;