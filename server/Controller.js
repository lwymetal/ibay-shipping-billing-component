const Cities = require('../db/models/Cities');
const Rates = require('../db/models/Rates');

const Controller = {

  // db.mycoll.aggregate(
  // { $sample: { size: 1 } }
  // )

  get: (req, res) => {
    var rCode;
    Cities.aggregate([
      { '$sample': { size: 1 } }, 
      { '$match': {'country': req.body.country} }
      ])
      .then(data => {
        console.log('response: ', data);
        rCode = []; // results[0].city_code;
        if (req.query.country === 'United States of America') {
          Rates.find(rCode)
            .then(data => {
              +req.body.zipcode > 79999 ? (response[0].basic_rate += 2, response[0].expedited_rate += 3, response[0].one_day_rate += 4) :
                +req.body.zipcode > 49999 ? (response[0].basic_rate += 1, response[0].expedited_rate += 2, response[0].one_day_rate += 3) :
                  {};
              console.log('RATES ', response[0].basic_rate, response[0].expedited_rate, response[0].one_day_rate);
              res.status(200).send(response[0]);
            })
            .catch(err => {
              res.status(400).send('GET error');
            }) 
        } else {
          Rates.find(rCode)
            .then(data => {
              res.status(200).send(response[0]);
            })
            .catch(err => {
              res.status(400).send('GET error');
            }) 
          }
      })
      .catch(err => {
        res.status(400).send('GET error');
      })
  }, 

  // post: (req, res) => {
  //   Models.post(req, res, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.status(201).send(results);
  //     }
  //   })
  // },

  // put: (req, res) => {
  //   Models.put(req.body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   })
  // },

  // delete: (req, res) => {
  //   Models.delete(req.body, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   })
  // }, 
}

module.exports = Controller;
