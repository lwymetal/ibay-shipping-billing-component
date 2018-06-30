const express = require('express');
const path = require('path');
const parser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const db = require('../db/config');
const router = require('./router');

app.use(helmet());

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', router);

app.listen(3000, err => {
  if (err) {
    console.log('Error connecting to server ', err);
  }
  console.log('Listening on port 3000');
});
