const { BillingRate } = require('../../db/schema/billingSchema');
const sequelize = require('sequelize');

const requestPromise = require('request-promise');

const billingShippingCtrl = {
  get: function(req, res) {

    const eastCoastStates = [
      'MI', 'IN', 'KY', 'TN', 'AL', 'OH', 'GA', 'FL', 'SC', 'NC' , 'VA', 'WV', 'DE',
      'MD', 'NJ', 'PA', 'NY', 'CT', 'RI', 'MA', 'VT', 'NH', 'ME', 'DC'
    ];

    const centralStates = [
      'WY', 'CO', 'NM', 'ND', 'SD', 'NE', 'KS', 'OK', 'TX', 'MN', 'IA', 'MO', 'AR',
      'LA', 'WI', 'IL', 'MS'
    ];

    const westCostStates = [
      'CA', 'OR', 'WA', 'NV', 'ID', 'UT', 'AZ', 'MT', 'AK', 'HI'
    ];

    if (req.query.country === 'United States of America') {
      const options = {
        url: `http://api.zippopotam.us/us/${req.query.zipcode}`,
        json: true
      };

      let state;

      requestPromise(options)
      .then(data => {
        state = data['places'][0]['state abbreviation'];

        BillingRate.findOne({
          where: {
            country: req.query.country
          }
        })
        .then(data => {
          let basicRate = Number(data.dataValues.basic_rate);
          let expeditedRate = Number(data.dataValues.expedited_rate);
          let oneDayRate = Number(data.dataValues.one_day_rate);

          if (eastCoastStates.includes(state)) {
            console.log('east coast');
          } else if (centralStates.includes(state)) {
            data.dataValues.basic_rate = String(basicRate + 1) + '.00';
            data.dataValues.expedited_rate = String(expeditedRate + 2) + '.00';
            data.dataValues.one_day_rate = String(oneDayRate + 3) + '.00';
            console.log('central');
          } else {
            data.dataValues.basic_rate = String(basicRate + 2) + '.00';
            data.dataValues.expedited_rate = String(expeditedRate + 3) + '.00';
            data.dataValues.one_day_rate = String(oneDayRate + 4) + '.00';
            console.log('west coast ');
          }
          res.status(201).send(data);
        })
        .catch(err => {
          console.log('error getting data ', err);
          res.status(401);
        });
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      BillingRate.findOne({
        where: {
          country: req.query.country
        }
      })
      .then(data => {
        console.log('data fetched');
        res.status(201).send(data);
      })
      .catch(err => {
        console.log('error getting data ', err);
        res.status(401);
      });
    }
  },
  post: function(req, res) {
    BillingRate.create(
      {country: req.query.country, 
       basic_rate: req.query.basic_rate, 
       expedited_rate: req.query.expedited_rate, 
       one_day_rate: req.query.one_day_rate
    })
    .then(results => {
      console.log('Post successful');
    })
    .catch(err => {
      console.log(err);
    })
  },
  put: function(req, res) {
    BillingRate.update(
      {basic_rate: 5.00},
      {where: {country: req.query.country}
    })
    .then(results => {
      console.log('Put successful');
    })
    .catch(err => {
      console.log(err);
    })
  },
  delete: function(req, res) {
    BillingRate.destroy(
      {where: {country: req.query.country}
      })
      .then(results => {
        console.log('Delete successful');
      })
      .catch(err => {
        console.log(err);
    });
  },
}

module.exports = {
  billingShippingCtrl: billingShippingCtrl
};
