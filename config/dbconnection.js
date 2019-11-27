import { Client } from 'pg';
import { config } from 'dotenv';

config();

// const TEST_ENV = 'testtt';
// if (TEST_ENV === 'test') {
//   process.env.DB_NAME = 'test_db';
// }

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

client
  .connect()
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => console.log(err));

export default client;