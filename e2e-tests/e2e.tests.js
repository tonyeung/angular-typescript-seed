/// <reference path="../typings/angular-protractor/angular-protractor.d.ts" />
/// <reference path="../typings/selenium-webdriver/selenium-webdriver.d.ts" />

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('page heading', function() {
  it('should be "dashboard template"', function() {
	  
	browser.get('http://localhost:8000/');
	var name = element(by.tagName('h1'));
	expect(name.getText()).to.eventually.equal('dashboard template');
  });
});
