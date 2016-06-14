/*
 global describe
 global it
 */

const chai = require('chai')
const exec = require('child_process').exec
const path = require('path')

var assert = chai.assert

console.log('Testing the app')

var cmd = 'node ' + path.join(__dirname, '../index.js') + ' '

describe('Conversion Params', function () {
  // Further code for tests goes here
  it('If no params', function (done) {
    // Test implementation goes here
    exec(`${cmd}`,
      function (err, stdout, stderr) {
        assert.isNotNull(err)
        done()
      })
  })

  it('If no amount', function (done) {
    exec(`${cmd} --f=USD --to=EUR  --ouput=fulls`,
      function (err, stdout, stderr) {
        assert.isNull(err)
        assert.strictEqual(stdout, 'Amount param should be defined\n')
        done()
      })
  })
})

describe('Conversion Logic', function () {
  it('If currency does not exist', function (done) {
    exec(`${cmd}  --f=USDG --to=EURs  --ouput=fulls 1`,
      function (err, stdout, stderr) {
        assert.isNull(err)
        assert.strictEqual(stdout, 'Currency no supported or bad spell\n')
        done()
      })
  })

  it('If conversion is good', function (done) {
    exec(`${cmd}  --f=USD --to=EUR  --ouput=fulls 1`,
      function (err, stdout, stderr) {
        assert.isNull(err)
        var result = stdout.split(' ')
        assert.isNotNull(result[0])
        assert.isNumber(parseInt(result[0]))
        done()
      })
  })
})
