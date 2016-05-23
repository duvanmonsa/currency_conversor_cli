#! /usr/bin/env node
'use strict'

const optimist = require('optimist').argv
const http = require('http')


if (optimist.help || optimist.h) {
  console.log(`Options:\n
  -f,-from        Currency that you are using as base\n
  -t,-to          Currency that you want to convert\n
  -s,-super       Show more details about the convert

  `)
  process.exit()
}

if (!optimist.from && !optimist.f) {
  console.log('From param should be defined')
  process.exit()
} else if (optimist.f === true) {
  console.log('From param should be defined')
  process.exit()
}

var from = optimist.from ? optimist.from : optimist.f

if (typeof from !== 'string') {
  console.log('From param should be string')
  process.exit()
}

from = from.toUpperCase()

if (!optimist.to && !optimist.t) {
  console.log('To param should be defined')
  process.exit()
} else if (optimist.t === true) {
  console.log('To param should be defined')
  process.exit()
}

var to = optimist.to ? optimist.to : optimist.t

if (typeof to !== 'string') {
  console.log('To param should be string')
  process.exit()
}

to = to.toUpperCase()

let type = 'simple'

if (optimist.super || optimist.s) {
  type = 'full'
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
