const db = require('../database/postgresql.js');
const redis = require('../database/redis.js');
const sha256 = require('js-sha256');
module.exports.getDay = (req, res) => {
  db.getDay(req.body.date, req.body.cohort, (err, data) => {
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
      res.status(400).send({ errmsg: err });
    } else {
      res.status(200).send(data);
    }
  });
}

module.exports.signIn = (req, res) => {
  let today = (new Date()).toLocaleDateString();
  db.signIn(req.body.student, req.body.cohort, req.body.keyword, req.body.phone_id, today, req.body.timest, (err, data) => {
    if (err) {
      console.error('Error signing in from DB: ', err);
      res.status(400).send();
    } else {
      res.status(200).send('SUCCESS');
    }
  });
}
module.exports.postCohorts = (req, res) => {
  db.postCohorts(req.body.cohort, (err, data) => {
    if (err) {
      console.error('Creating cohort in DB error: ', err);
      res.status(400).send();
    } else {
      res.status(200).send('SUCCESS');
    }
  });
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

module.exports.adminSignIn = (req, res) => {
  db.adminSignIn(req.body.user, req.body.password, (err, data) => {
    if (err) {
      console.error('Error signing into DB: ', err);
      res.status(400).send();
    } else {
      let num = Math.ceil(Math.random() * 100000));
  let token = sha256(num.toString());
  redis.setCache(token);
  res.status(200).send({ token });
}
  })
}