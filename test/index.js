const assert = require('assert');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const people = require('./sample/sample_people');
const server = require('../index.js');

const PORT = 8081;

describe('HTTP Server Test', function() {
  before(function() {
    server.listen(PORT);
  });

  after(function() {
    server.close();
  });

  xdescribe('API endpoints', function() {
    describe('/People', function() {
      it('should paginate all results', function (done) {
        axios.get(`http://127.0.0.1:${PORT}/people`).then(result => {
          console.log('RESULT', result.data);
          // expect(result.data.length).to.equal(87);
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

  describe('API Functions', function() {
    describe('Sort', function() {
      it('should sort items by name 1234', function (done) {
        expect(server.sort(people.unsorted, 'name')).to.deep.equal(people.alphabetically)
        done()
      })
        .timeout(6000)
      it('should sort items by mass', function (done) {
        console.log(server.sort(people.unsorted, 'mass'));
        expect(server.sort(people.unsorted, 'mass')).to.deep.equal(people.byMass)
        done()
      })
        .timeout(6000)
      it('should sort items by height', function (done) {
        expect(server.sort(people.unsorted, 'height')).to.deep.equal(people.byHeight)
        done()
      })
        .timeout(6000)
    });
  });
});