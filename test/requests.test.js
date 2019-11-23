import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('REQUESTS ROUTES', () => {
  it('GET / - Fetch all requests', (done) => {
    chai
      .request(app)
      .get('/api/v1/requests/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        expect(res.body).to.have.property('data');
        done(err);
      });
  });

  it('PUT /<requestId>/approve - Approve a request', (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/requests/${id}/approve`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Request approved!');
        done(err);
      });
  });

  it('PUT /<requestId>/approve - Approve a request that does not exist', (done) => {
    const id = 99;
    chai
      .request(app)
      .get(`/api/v1/requests/${id}/approve`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equals('Request does not exist!');
        done(err);
      });
  });

  it('PUT /<requestId>/disapprove - Disapprove a request', (done) => {
    const id = 1;
    chai
      .request(app)
      .put(`/api/v1/requests/${id}/disapprove`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals(
          'Sorry, your request has been disapproved.'
        );
        done(err);
      });
  });

  it('PUT /<requestId>/disapprove - Disapprove a request that does not exist', (done) => {
    const id = 99;
    chai
      .request(app)
      .get(`/api/v1/requests/${id}/disapprove`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equals('Request does not exist!');
        done(err);
      });
  });

  it('PUT /<requestId>/resolve - Resolve a request', (done) => {
    const id = 1;
    chai
      .request(app)
      .put(`/api/v1/requests/${id}/resolve`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals(
          'Congratulations, your request has been resolved.'
        );
        done(err);
      });
  });

  it('PUT /<requestId>/resolve - Resolve a request that does not exist', (done) => {
    const id = 99;
    chai
      .request(app)
      .get(`/api/v1/requests/${id}/resolve`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equals('Request does not exist!');
        done(err);
      });
  });
});
