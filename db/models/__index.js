const db = require('../../index');

const Models = {

  get: function(params, cb) {
    var rCode;
    db.query(`select * from cities where country="${params.country}" order by rand() limit 1`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        rCode = results[0].city_code;
        if (params.country === 'United States of America') {
          console.log('zip code ', params.zipcode);
          db.query(`select * from rates where city_code=${rCode}`, (err, response) => {
            if (err) {
              console.log(err);
            } else {
              +params.zipcode > 79999 ? (console.log('7'), response[0].basic_rate += 2, response[0].expedited_rate += 3, response[0].one_day_rate += 4) :
                +params.zipcode > 49999 ? (console.log('4'), response[0].basic_rate += 1, response[0].expedited_rate += 2, response[0].one_day_rate += 3) :
                  {};
              console.log('RATES ', response[0].basic_rate, response[0].expedited_rate, response[0].one_day_rate);
              cb(null, response[0]);
            }
          });
        } else {
          db.query(`select * from rates where city_code=${rCode}`, (err, results) => {
            if (err) { 
              console.log(err);
            } else {
              cb(null, results[0]);
            }
          });  
        }
      }
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