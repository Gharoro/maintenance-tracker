import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { user_info } from './dummies';

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

  it('POST /signup - Send an error if email or username already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user_info)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done(err);
      });
  });

  it('POST /login - Logs in a user with valid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'davemiller@email.com',
        password: '1234567'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done(err);
      });
  });

  it('POST /login - Do not log in a user with invalid email or username', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'johndoe@email.com',
        password: '1234567'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('Email or Username is not registered. Please signup!');
        done(err);
      });
  });
});
