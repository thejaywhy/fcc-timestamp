//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var server = require('../server');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var EXPECTED_TIME_UNIX = 1519171200;
var EXPECTED_TIME_NATURAL = "February 21, 2018";
var EXPECTED_TIME_NATURAL_URLENCODED = "February%2021,%202018";



chai.use(chaiHttp);

describe('App', () => {

  beforeEach((done) => { 
    done();
  });

  describe('/GET index', () => {
    it('it should return the index view', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;

          done();
        });
    })
  });

  describe('/GET unix timestamp', () => {
    it('it should return a 200 and timestamp json', (done) => {

      chai.request(server)
        .get('/' + EXPECTED_TIME_UNIX)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('unix');
          res.body.should.have.property('natural');
          res.body.unix.should.equal(EXPECTED_TIME_UNIX);
          res.body.natural.should.equal(EXPECTED_TIME_NATURAL);

          done();
        });
    })
  });

  describe('/GET natural timestamp', () => {
    it('it should return a 200 and timestamp json', (done) => {
      chai.request(server)
        .get('/' + EXPECTED_TIME_NATURAL_URLENCODED)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('unix');
          res.body.should.have.property('natural');
          res.body.unix.should.equal(EXPECTED_TIME_UNIX);
          res.body.natural.should.equal(EXPECTED_TIME_NATURAL);

          done();
        });
    })
  });

  describe('/GET unknown date stamp format', () => {
    it('it should return a 200 and null timestamp values', (done) => {
      chai.request(server)
        .get('/' + "Dec 24 1982")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('unix');
          res.body.should.have.property('natural');
          should.equal(res.body.unix, null);
          should.equal(res.body.natural, null);

          done();
        });
    })
  });


});
