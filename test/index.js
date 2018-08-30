const assert = require('assert');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const server = require('../index.js');
const PORT = 8081

describe('HTTP Server Test', function() {
  before(function() {
    server.listen(PORT);
  });

  after(function() {
    server.close();
  });

  describe('API endpoints', function() {
    describe('/People', function() {
      it('should return people', function (done) {
        axios.get(`http://127.0.0.1:${PORT}/people`).then(result => {
          expect(result.data).to.equal('people');
          done();
        });
      })
        .timeout(6000)
    });
    describe('/Planets', function() {
      it('should return people', function (done) {
        axios.get(`http://127.0.0.1:${PORT}/planets`).then(result => {
          expect(result.data).to.equal('planets');
          done();
        });
      })
        .timeout(6000)
    });
  });
});