DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS keywords;

CREATE TABLE cohorts (
  id SERIAL PRIMARY KEY,
  cohort VARCHAR (16) UNIQUE
);

CREATE TABLE keywords (
  id SERIAL PRIMARY KEY,
  timest TIMESTAMP UNIQUE,
  keyword VARCHAR (32)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  student VARCHAR (32),
  cohort_id int references cohorts(id) ON DELETE CASCADE
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  student_id INT references users(id) ON DELETE CASCADE,
  cohort_id INT references cohorts(id) ON DELETE CASCADE,
  phone_id VARCHAR (65),
  keyword VARCHAR (32),
  timest TIMESTAMP
);