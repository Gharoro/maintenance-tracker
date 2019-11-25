import chai from 'chai';
import chaiHttp from 'chai-http';
import { Client } from 'pg';
import { config } from 'dotenv';
import app from '../index';
import { login_info, user_info } from './dummies';

config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

const { expect } = chai;
chai.use(chaiHttp);


describe('AUTH ROUTES', () => {
  it('POST /signup - Creates a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user_info)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.success).to.equals('Account created successfuly');
        done(err);
      });
  });

  it('POST /login - Logs in a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(login_info)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done(err);
      });
  });

  it('GET /logout - Logs out a user', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Successfuly logged out');
        done(err);
      });
  });
});
