#! /usr/bin/env node
'use strict'

const optimist = require('optimist').argv
const http = require('http')

if (!optimist.from && !optimist.f) {
  console.log('From param should be defined')
  process.exit()
}

var from = optimist.from ? optimist.from : optimist.f

from = from.toUpperCase()

if (!optimist.to && !optimist.t) {
  console.log('To param should be defined')
  process.exit()
}

var to = optimist.to ? optimist.to : optimist.t
to = to.toUpperCase()

let type = 'simple'

if (optimist.ouput || optimist.o) {
  if (optimist.ouput === 'full' || optimist.o === 'full') type = 'full'
};

let amount
process.argv.forEach((value) => {
  if (!isNaN(parseFloat(value)) && isFinite(value)) {
    amount = value
  }
})

if (!amount) {
  console.log('Amount param should be defined')
  process.exit()
}

var code = `${from}_${to}`

http.get('http://free.currencyconverterapi.com/api/v3/convert?q=' + code + '&compact=ultra', (res) => {
  res.on('data', (data) => {
    data = JSON.parse(data)
    if (!data[code]) {
      console.log('Currency no supported or bad spell')
    } else {
    // raw response
      if (type === 'full') {
        console.log(`Amount: ${amount} ${from}`)
        console.log(`From: ${from}`)
        console.log(`To: ${to}`)
        console.log(`Current Rate: ${data[code]} ${to}`)
        console.log(`Total: ${amount * data[code]} ${to}`)
      } else {
        console.log(`${amount * data[code]} ${to}`)
      }
    }
  })
})
