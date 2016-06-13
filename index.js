#! /usr/bin/env node
'use strict'

const optimist = require('optimist')
  .usage('Usage: $0 -f [currency] -t [currency] [num]')
  .demand(['f', 't'])
  .alias('f', 'from')
  .describe('f', `Currency that you are using as base

                        USD,EUR,GBP,COP...

                        Ways to use it:

                        -f USD, --f USD, --f=USD, --from USD, --from=USD`)
  .alias('t', 'to')
  .describe('t', `Currency that you want to convert

                        USD,EUR,GBP,COP...

                        Ways to use it:

                        -t USD, --t USD, --t=USD, --to USD, --to=USD`)
  .alias('h', 'help')
  .alias('s', 'super')
  .describe('s', `Show more details about the conversion

                       if you don't pass this param it will show the basic information

                        Ways to use it:

                        -s, --s, -super, --super`)
  .argv
const http = require('http')

if (typeof optimist.from !== 'string') {
  console.log('From param should be string')
  process.exit()
}

optimist.from = optimist.from.toUpperCase()

if (typeof optimist.to !== 'string') {
  console.log('To param should be string')
  process.exit()
}

optimist.to = optimist.to.toUpperCase()

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

let type = 'simple'

if (optimist.s) {
  type = 'full'
};

var code = `${optimist.from}_${optimist.to}`

http.get('http://free.currencyconverterapi.com/api/v3/convert?q=' + code + '&compact=ultra', (res) => {
  res.on('data', (data) => {
    data = JSON.parse(data)
    if (!data[code]) {
      console.log('Currency no supported or bad spell')
    } else {
      // raw response
      if (type === 'full') {
        console.log(`Amount: ${amount} ${optimist.from}`)
        console.log(`From: ${optimist.from}`)
        console.log(`To: ${optimist.to}`)
        console.log(`Current Rate: ${data[code]} ${optimist.to}`)
        console.log(`Total: ${amount * data[code]} ${optimist.to}`)
      } else {
        console.log(`${amount * data[code]} ${optimist.to}`)
      }

      console.log('---------------------------------------------------------')
    }
  })
})
