#! /usr/bin/env node

var optimist = require('optimist').argv
var Client = require('node-rest-client').Client
var client = new Client()

if (!optimist.from && !optimist.f) console.log('From param should be defined')

var from = optimist.from ? optimist.from : optimist.f

from = from.toUpperCase()

if (!optimist.to && !optimist.t) console.log('To param should be defined')

var to = optimist.to ? optimist.to : optimist.t
to = to.toUpperCase()

var type = 'simple'

if (optimist.ouput || optimist.o) {
  if (optimist.ouput === 'full' || optimist.o === 'full') type = 'full'
};

var amount
process.argv.forEach(function (value) {
  if (!isNaN(parseFloat(value)) && isFinite(value)) {
    amount = value
  }
})

if (!amount) console.log('Amount param should be defined')

var code = from + '_' + to

const path = 'http://free.currencyconverterapi.com/api/v3/convert?q=' + code + '&compact=ultra'

client.get(path, function (data, response) {
  if (!data[code]) {
    console.log('Currency no supported or bad spell')
  } else {
  // raw response
    if (type === 'full') {
      console.log('Amount: ' + amount + ' ' + from)
      console.log('From: ' + from)
      console.log('To: ' + to)
      console.log('Current Rate: ' + data[code] + ' ' + to)
      console.log('Total: ' + amount * data[code] + ' ' + to)
    } else {
      console.log(amount * data[code] + ' ' + to)
    }
  }
})

