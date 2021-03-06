'use strict';
const chai = require('chai');
const sinon = require('sinon');
const sinonTest = require('sinon-test');
var test = sinonTest(sinon);
const expect = require('chai').expect;
let request = require('superagent');


let BlockCypher = require('../../lib/bcypher');
let chain = 'btc';
let network = 'main';
let token = process.env.TOKEN;
let bcapi = new BlockCypher(chain, network, token);


describe('Blockcypher createHook Method: ', function () {


  describe('Success: ', function () {

    it('When data.event && data.address && data.url exist', test(function (done) {

      let event = 'hook';
      let address = 'hexString';
      let url = 'http://a.url.com';
      let data = { event: event, address: address, url: url };
      let validData = data;
      let params = {};
      let validEndpoint = '/hooks';

      let validReturn = { data: { key1: 'value', key2: 2 } };
      this.stub(bcapi, '_post').yields(null, validReturn);
      bcapi.createHook(data, function (e, r) {

        var callArgs = bcapi._post.getCall(0).args;
        expect(callArgs[0]).to.equal(validEndpoint);
        expect(callArgs[1]).to.deep.equal(params);
        expect(callArgs[2]).to.deep.equal(validData);
        expect(typeof callArgs[3]).to.equal('function');
        expect(Object.keys(callArgs).length).to.equal(4);

        expect(e).to.equal(null);
        expect(r).to.deep.equal(validReturn);
        done();
      });
    }));

  });//end of success cases;

  describe('Errors: ', function () {

    it('bubbles up error when _post returns error', test(function (done) {

      let event = 'hook';
      let address = 'hexString';
      let url = 'http://a.url.com';
      let data = { event: event, address: address, url: url };
      let validData = data;
      let params = {};
      let badRequestError = "Bad Request";
      let validEndpoint = '/hooks';


      let validReturn = { data: { key1: 'value', key2: 2 } };
      this.stub(bcapi, '_post').yields(badRequestError, validReturn);
      bcapi.createHook(data, function (e, r) {

        var callArgs = bcapi._post.getCall(0).args;
        expect(callArgs[0]).to.equal(validEndpoint);
        expect(callArgs[1]).to.deep.equal(params);
        expect(callArgs[2]).to.deep.equal(validData);
        expect(typeof callArgs[3]).to.equal('function');
        expect(Object.keys(callArgs).length).to.equal(4);

        expect(e).to.equal(badRequestError);
        expect(r).to.deep.equal(validReturn);
        done();
      });
    }));

    it.skip('When data.event is null/undefined', function (done) { done(); }); //TODO Error out when event does not exist
    it.skip('When data.address is null/undefined', function (done) { done(); }); //TODO Error out when address does not exist
    it.skip('When data.url is null/undefined', function (done) { done(); }); //TODO Error out when url does not exist

  });//end of error cases;



});//end of createHook
