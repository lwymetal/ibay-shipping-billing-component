const Models = require('./models');

const Controller = {

  get: (req, res) => {
    Models.get(req.query, (err, results) => {
      if (err) {
        console.log('error', err);
      } else {
        res.status(200).send(results);
      }
    })
  }, 

  post: (req, res) => {
    Models.post(req, res, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send(results);
      }
    })
  },

  put: (req, res) => {
    Models.put(req.body, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(results);
      }
    })
  },

  delete: (req, res) => {
    Models.delete(req.body, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(results);
      }
    })
  }, 
}

module.exports = Controller;
