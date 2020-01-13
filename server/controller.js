const db = require('../database/postgresql.js');

module.exports.getDay = (req, res) => {
  db.getDay(((req.query === undefined || req.query.date === undefined) ? (new Date()).toLocaleDateString() : req.query.date), (err, data) => {
    if (err) {
      console.error('Getting Day Info from DB error: ', err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
}
module.exports.getCohorts = (req, res) => {
  db.getCohorts((err, data) => {
    if (err) {
      console.error('Getting cohorts from DB error: ', err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
}
module.exports.getUsers = (req, res) => {
  db.getUsers(req.query.cohort, (err, data) => {
    if (err) {
      console.error('Getting users from DB error: ', err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
}
module.exports.getKeywords = (req, res) => {
  const date = ((req.query === undefined || req.query.date === undefined) ? undefined : req.query.date);
  db.getKeywords(date, (err, data) => {
    if (err) {
      console.error('Getting keywords from DB error: ', err);
      res.status(400).send();
    } else {
      res.status(200).send(data);
    }
  });
}

module.exports.postCohorts = (req, res) => {
  if (req.body.cohort === undefined || typeof req.body.cohort !== 'string') {
    res.status(400).send();
  } else {
    db.postCohorts(req.body.cohort, (err, data) => {
      if (err) {
        console.error('Creating cohort in DB error: ', err);
        res.status(400).send();
      } else {
        res.status(200).send('SUCCESS');
      }
    });
  }
}
module.exports.postUsers = (req, res) => {
  if (req.body.student === undefined || req.body.cohort === undefined || typeof req.body.cohort !== 'string' || typeof req.body.student !== 'string') {
    res.status(400).send();
  } else {
    db.postUsers(req.body.student, req.body.cohort, (err, data) => {
      if (err) {
        console.error('Creating student in DB error: ', err);
        res.status(400).send();
      } else {
        res.status(200).send('SUCCESS');
      }
    });
  }
}
module.exports.postKeywords = (req, res) => {
  const keywordGenerator = () => {
    var keyword = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 32; i++) {
      keyword += characters[Math.floor(Math.random() * characters.length)];
    }
    return keyword;
  }
  const date = (req.body === undefined || req.body.date === undefined) ? (new Date()).toLocaleDateString() : req.body.date;
  const keyword = (req.body === undefined || req.body.keyword === undefined) ? keywordGenerator() : req.body.keyword;
  db.postKeywords(date, keyword, (err, data) => {
    if (err) {
      console.error('Creating keyword in DB error: ', err);
      res.status(400).send();
    } else {
      res.status(200).send('SUCCESS');
    }
  })
}