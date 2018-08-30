const assert = require('assert');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const people = require('./sample/sample_people');
const server = require('../index.js');

const PORT = 8081;

describe('HTTP Server Test', function () {
  before(function () {
    server.listen(PORT);
  });

  after(function () {
    server.close();
  });

  describe('API endpoints', function () {
    describe('/People', async function () {
      it('should return all (87) People', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people`);
        expect(data.length).to.equal(87);
      })
        .timeout(30000);
      it('should accept a sortBy Parameter', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people/name`);
        expect(data[0].name).to.equal("Ackbar");
      })
        .timeout(30000);
      it('should reject any request with an invalid sortBy Parameter', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people/123414`);
        expect(data.message).to.equal('invalid sort parameter');
      })
        .timeout(6000)
    });

    describe('/Planets', function () {
      it('should return planets', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/planets`);
        expect(data.length).to.equal(61);
      })
        .timeout(15000);
    });
  });

  describe('API Functions', function () {
    describe('Sort', function () {
      it('should sort people by name', function (done) {
        expect(server.sort(people.unsorted, 'name')).to.deep.equal(people.alphabetically);
        done()
      })
        .timeout(6000);
      it('should sort people by mass', function (done) {
        expect(server.sort(people.unsorted, 'mass')).to.deep.equal(people.byMass);
        done()
      })
        .timeout(6000);
      it('should sort people by height', function (done) {
        expect(server.sort(people.unsorted, 'height')).to.deep.equal(people.byHeight);
        done()
      })
        .timeout(6000);
    });
    describe('Get People', function () {
      it('should populate the people Cache', async function () {
        let peopleCache = await server.getPeople();
        expect(peopleCache.length).to.equal(87);
      })
        .timeout(30000);

    });
    describe('Send People', function () {
      it('should paginate all results - Even when passed no sortBy parameter', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people`);
        expect(data.length).to.equal(87);
      })
        .timeout(30000);
      it('should accept sorting parameters - Name', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people/name`);
        expect(data[0].name).to.equal("Ackbar");
      })
        .timeout(6000);
      it('should accept sorting parameters - Mass', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people/mass`);
        expect(data[0].name).to.equal("Grievous");
      })
        .timeout(6000);
      it('should accept sorting parameters - Height', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/people/height`);
        expect(data[0].name).to.equal("Yarael Poof");
      })
        .timeout(6000);
    });
    describe('Get Planets', function () {
      it('should paginate all (61) results', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/planets`);
        expect(data.length).to.equal(61);
      })
        .timeout(30000);
      it('should replace NameURLs with actual names of people', async function () {
        let {data} = await axios.get(`http://127.0.0.1:${PORT}/planets`);
        expect(data[0].residents[0]).to.equal("Leia Organa");
      })
        .timeout(10000);
    });
  });
});