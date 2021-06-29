const { Client } = require('pg');

const client = new Client({
  user: 'nodeuser',
  database: 'postgres',
  password: 'Node1234',
  host: 'localhost',
  port: '5432',
  log: console.log,
  ssl: false,
});

client.connect();

//let query = "INSERT INTO Users (username, password) VALUES ('Ryan', 'test1234')";
let query = "SELECT * FROM users";
client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
	let rows = res.rows
	
	for (let i in rows)
	{
		console.log(rows[i].username);
	}
    console.log('Data insert successful');
    client.end();
});