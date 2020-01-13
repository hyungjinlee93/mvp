const { Pool } = require('pg');
const pool = new Pool({
  database: 'test'
});

module.exports.getDay = (date, cb) => {
  pool.query(`SELECT users.student, cohorts.cohort, attendance.phone_id, timest FROM users, cohorts, attendance WHERE attendance.timest > '${date}' AND attendance.cohort_id = cohorts.id AND attendance.student_id = users.id;`)
    .then(res => {
      cb(null, res.rows);
    })
    .catch(err => {
      cb(err);
    });
}
module.exports.getCohorts = (cb) => {
  pool.query(`SELECT cohort FROM cohorts ORDER BY cohort`)
    .then(res => {
      cb(null, res.rows);
    })
    .catch(err => {
      cb(err);
    });
}
module.exports.getUsers = (cohort, cb) => {
  pool.query(`SELECT users.student FROM users, cohorts WHERE cohorts.cohort = '${cohort}' AND cohorts.id = users.cohort_id ORDER BY users.student;`)
    .then(res => {
      cb(null, res.rows);
    })
    .catch(err => {
      cb(err);
    })
}
module.exports.getKeywords = (date, cb) => {
  if (date === undefined) {
    pool.query(`SELECT keyword, timest FROM keywords`)
      .then(res => {
        cb(null, res.rows);
      })
      .catch(err => {
        cb(err);
      })
  } else {
    pool.query(`SELECT keyword, timest FROM keywords WHERE timest = '${date}'`)
      .then(res => {
        cb(null, res.rows);
      })
      .catch(err => {
        cb(err);
      })
  }
}

module.exports.postCohorts = (cohort, cb) => {
  pool.query(`INSERT INTO cohorts (cohort) VALUES ('${cohort}');`)
    .then(res => {
      cb(null, 'SUCCESS');
    })
    .catch(err => {
      cb(err);
    })
}
module.exports.postUsers = (student, cohort, cb) => {
  pool.query(`INSERT INTO users (student, cohort_id) SELECT '${student}', cohorts.id FROM cohorts WHERE cohorts.cohort = '${cohort}';`)
    .then(res => {
      cb(null, 'SUCCESS');
    })
    .catch(err => {
      cb(err);
    })
}
module.exports.postKeywords = (date, keyword, cb) => {
  pool.query(`INSERT INTO keywords (timest, keyword) VALUES ('${date}', '${keyword}');`)
    .then(res => {
      cb(null, 'SUCCESS');
    })
    .catch(err => {
      cb(err);
    })
}