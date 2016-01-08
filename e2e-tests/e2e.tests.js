/// <reference path="../typings/angular-protractor/angular-protractor.d.ts" />
/// <reference path="../typings/selenium-webdriver/selenium-webdriver.d.ts" />

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

beforeEach(function () {
	browser.get('/');
});

describe('page heading', function () {
	
	it('should be "Login", when not authenticated', function () {
		browser.waitForAngular();

		var form = element(by.css('.login form[name="loginForm"]'));
		expect(form).to.be.ok;
	});

	it('should be "Dashboard", when authenticated', function () {
		browser.waitForAngular();

		element(by.name('username')).sendKeys('foo');
		element(by.name('password')).sendKeys('bar');
		element(by.name('loginButton')).click();
		
		var elem = element(by.css(".dashboard"));
		var until = protractor.ExpectedConditions;
		browser.wait(until
					.presenceOf(elem), 
					5000, 
					'Element taking too long to appear in the DOM'
		);
	});

	it('should show menu when menu button clicked ', function () {
		browser.waitForAngular();

		element(by.name('username')).sendKeys('foo');
		element(by.name('password')).sendKeys('bar');
		element(by.name('loginButton')).click();
		
		var menuIcon = element(by.cssContainingText("header button md-icon", "menu"));
		var until = protractor.ExpectedConditions;
		browser.wait(until
					.presenceOf(menuIcon), 
					5000, 
					'Element taking too long to appear in the DOM'
		);
    
    
    browser.findElement(by.cssContainingText("header button md-icon", "menu")).then(function (result) {
      var menuButton = result.findElement(by.xpath('ancestor::button'));
      menuButton.click();
      
      var backdrop = element(by.css('div[ui-view="nav"] md-backdrop'));
		  expect(backdrop).to.be.ok;
    });
	});
});