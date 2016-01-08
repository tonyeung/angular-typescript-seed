exports.config = {
  framework: 'mocha',
  mochaOpts: { reporter: 'mochawesome' },
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
  
  multiCapabilities: [{
    'browserName': 'chrome',
    shardTestfiles: true,
    maxInstances: 3
  }]
}