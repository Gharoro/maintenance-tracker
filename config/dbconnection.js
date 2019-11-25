import { Client } from 'pg';
import { config } from 'dotenv';

config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

// Create tables
const create_tables = () => {
  const query_text = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    username VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gravatar VARCHAR(255) NOT NULL,
    role VARCHAR(128) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP
  )`;

  const request_query_text = `CREATE TABLE IF NOT EXISTS
  requests(
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    body VARCHAR(255) NOT NULL,
    category VARCHAR(128) NOT NULL,
    customer_name VARCHAR(128) NOT NULL,
    customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(128) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP
  )`;
  client
    .query(query_text)
    .then((result) => {
      console.log(result);
      client.end();
    })
    .catch((e) => console.error(e.stack))
    .then(() => client.end());
};

// Drop tables
const dropTables = (table) => {
  const queryText = `DROP TABLE IF EXISTS ${table}`;
  client
    .query(queryText)
    .then((result) => {
      console.log(result);
      client.end();
    })
    .catch((err) => {
      console.log(err);
      client.end();
    });
};

client
  .connect()
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => console.log(err));

export default client;
