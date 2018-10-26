const pg = require('pg');

const config = {
  user: 'school_reg', //this is the db user credential
  database: 'school_register',
  password: 'school_reg',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const createTables = () => {
  const schoolTable = `CREATE TABLE IF NOT EXISTS
      students(
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(128) NOT NULL,
        student_age INT NOT NULL,
        student_class VARCHAR(128) NOT NULL,
        parent_contact VARCHAR(128) NOT NULL,
        admission_date VARCHAR(128) NOT NULL
      )`;
  pool.query(schoolTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};




//export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require('make-runnable');

