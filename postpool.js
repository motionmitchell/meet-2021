const { Pool } = require('pg');
const pg = require('pg');
const moment = require('moment');

const pool = new Pool({
  user: 'nodeuser',
  database: 'postgres',
  password: 'Node1234',
  host: 'localhost',
  port: '5432',
  log: console.log,
  ssl: false,
});
pool.connect();
let query = "INSERT INTO Users (username, password) VALUES ('Bob', 'Test1234')";
pool.query(query);

//pool.close();
/*
pg.types.setTypeParser(1114, date => moment.utc(date).format());

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, (err, res) => {
      console.log(err, err.message);
      callback(err, res);
    });
  },
  getClient: callback => {
    pool.connect((err, client, done) => {
	
      callback(err, client, done);
    });
  }
};
pg_ctl -D "C:\Program Files\PostgreSQL\13\data" restart
*/