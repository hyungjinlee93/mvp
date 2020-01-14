const { Pool } = require('pg');
const psqlpassword = require('../keys/psqlrootpw');
const pool = new Pool({
  database: 'test'
});
// const pool = new Pool({
//   user: 'root',
//   password: psqlpassword,
//   host: '172.31.30.159',
//   database: 'mvp'
// });

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

module.exports.signIn = (student, cohort, keyword, phone_id, today, timest, cb) => {
  pool.query(`SELECT attendance.id FROM attendance, users WHERE attendance.timest > '${today}' AND users.student = '${student}' AND users.id = attendance.student_id`)
    .then(res => {
      if (res.rows[0] !== undefined) {
        cb('Already signed in');
      } else {
        pool.query(`SELECT keyword FROM keywords WHERE timest='${today}'`)
          .then(res => {
            if (res.rows[0] !== undefined && res.rows[0].keyword === keyword) {
              pool.query(`INSERT INTO attendance (student_id, cohort_id, phone_id, keyword, timest) SELECT users.id, users.cohort_id, '${phone_id}', '${keyword}', '${timest}' FROM users WHERE users.student = '${student}'`)
                .then(res => {
                  cb(null, 'SUCCESS');
                })
                .catch(err => {
                  cb(err);
                })
            } else {
              cb('Wrong keyword');
            }
          })
      }
    })
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