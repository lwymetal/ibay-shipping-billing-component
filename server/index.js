const express = require('express');
const path = require('path');
const parser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());

const PORT = 3000;

const { router } = require('./router');

require('../db/config');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', router);

app.listen(PORT, err => {
  if (err) {
    console.log('error connecting to server ', err);
  }
  console.log('connected to server on PORT ', PORT);
});
