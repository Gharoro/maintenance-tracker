import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { request_info } from './dummies';

const { expect } = chai;
chai.use(chaiHttp);

describe('USER ROUTES', () => {
  it('GET /requests - fetch all the requests of a logged in user', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('GET /requests/<requestId> - fetch a request that belongs to a logged in user', (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/users/requests/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('GET /requests/<requestId> - fetch a request that does not exist', (done) => {
    const id = 99;
    chai
      .request(app)
      .get(`/api/v1/users/requests/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equals('Request not found!');
        done(err);
      });
  });

  it('POST /requests - Creates a request', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/requests/')
      .send(request_info)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Request sent!');
        done(err);
      });
  });

  it('PUT /requests/<requestId> - modify a request that belongs to a logged in user', (done) => {
    const id = 1;
    chai
      .request(app)
      .put(`/api/v1/users/requests/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Request successfully updated');
        done(err);
      });
  });

  it('PUT /requests/<requestId> - modify a request that does not exist', (done) => {
    const id = 99;
    chai
      .request(app)
      .put(`/api/v1/users/requests/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equals('Request does not exist!');
        done(err);
      });
  });
});
