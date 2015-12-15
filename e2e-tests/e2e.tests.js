/// <reference path="../typings/angular-protractor/angular-protractor.d.ts" />
/// <reference path="../typings/selenium-webdriver/selenium-webdriver.d.ts" />

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

beforeEach(function () {
	browser.get('http://localhost:8000/');
});

describe('page heading', function () {
	
	it('should be "Login", when not authenticated', function () {
		browser.waitForAngular();

		var title = element(by.css('.login h3.panel-title'));
		expect(title.getText()).to.eventually.equal('Login');
	});

	it('should be "Dashboard", when authenticated"', function () {
		browser.waitForAngular();

		var heading = element(by.css('.dashboard h1.page-heading'));
		expect(heading.getText()).to.eventually.equal('Dashboard');
	});
});
