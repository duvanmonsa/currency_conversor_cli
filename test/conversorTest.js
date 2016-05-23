const chai = require('chai')
const exec = require('child_process').exec

var assert = chai.assert

console.log('Testing the app')

describe('Conversion Params', function () {
  // Further code for tests goes here
  it('If no params', function (done) {
    // Test implementation goes here
    exec('currencyconv',
      function (err, stdout, stderr) {
        assert.isNull(err)
        assert.strictEqual(stdout, 'From param should be defined\n')
        done()
      })
  })

  it('If no amount', function (done) {
    exec('currencyconv  --f=USD --to=EUR  --ouput=fulls',
      function (err, stdout, stderr) {
        assert.isNull(err)
        assert.strictEqual(stdout, 'Amount param should be defined\n')
        done()
      })
  })
})

describe('Conversion Logic', function () {
  it('If currency does not exist', function (done) {
    exec('currencyconv  --f=USDG --to=EURs  --ouput=fulls 1',
      function (err, stdout, stderr) {
        assert.isNull(err)
        assert.strictEqual(stdout, 'Currency no supported or bad spell\n')
        done()
      })
  })

  it('If conversion is good', function (done) {
    exec('currencyconv  --f=USD --to=EUR  --ouput=fulls 1',
      function (err, stdout, stderr) {
        assert.isNull(err)
        var result = stdout.split(' ')
        assert.isNotNull(result[0])
        assert.isNumber(parseInt(result[0]))
        done()
      })
  })
})
