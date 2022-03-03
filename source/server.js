const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

app.use('/v1/user', require('./User/user.controller'));

router.get('/healthz', (req, res) => {
  console.log('inside get request');
  res.send();
});
app.use('/v1', router);
router.get('*', (req, res) => {
  res.status(400);
  res.setHeader('Content-Type', 'application/json');
  res.send()
});
module.exports = app;
