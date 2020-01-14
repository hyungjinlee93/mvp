const express = require('express');
const controller = require('./controller.js');
const path = require('path');
const redis = require('../database/redis.js');

const port = 3001;
const app = express();

app.use(express.json());

app.post('/api/getDay', (req, res) => {
  redis.getCache(req.body.token, (err, data) => {
    if( err || data !== "true") {
      res.status(400).send();
    } else {
      controller.getDay(req, res);
    }
  });
});
app.get('/api/cohorts', (req, res) => {
  controller.getCohorts(req, res);
});
app.get('/api/users', (req, res) => {
  controller.getUsers(req, res);
});
app.get('/api/keywords', (req, res) => {
  //authentication here
  controller.getKeywords(req, res);
});

app.post('/api/adminsignin', (req, res) => {
  controller.adminSignIn(req, res);
});
app.post('/api/signin', (req, res) => {
  controller.signIn(req, res);
});
app.post('/api/cohorts', (req, res) => {
  redis.getCache(req.body.token, (err, data) => {
    if( err || data !== "true") {
      res.status(400).send();
    } else {
      controller.postCohorts(req, res);
    }
  });
});
app.post('/api/users', (req, res) => {
  //authentication here
  controller.postUsers(req, res);
});
app.post('/api/keywords', (req, res) => {
  //authentication here
  controller.postKeywords(req, res);
});

app.listen(port, () => {console.log(`Graph server now running on ${port}`); });