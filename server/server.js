const express = require('express');
const controller = require('./controller.js');
const path = require('path');

const port = 3001;
const app = express();

app.use(express.json());

app.get('/api/getDay', (req, res) => {
  //authentication here
  controller.getDay(req, res);
});
app.get('/api/cohorts', (req, res) => {
  controller.getCohorts(req, res);
});
app.get('/api/users', (req, res) => {
  controller.getUsers(req, res);
});
app.get('/api/keywords', (req, res) => {
  controller.getKeywords(req, res);
});

app.post('/api/cohorts', (req, res) => {
  //authentication here
  controller.postCohorts(req, res);
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