'use strict'
/**
 * Starting point of the application.
 *
 * @author Viktor Ödman
 * @version 1.0.0
 */

const TerminalHangman = require('./src/TerminalHangman')
let startValue = false
let testSettings = false

if (process.argv[2] === 'test') {
  if (process.argv[3] === 'settings') {
    testSettings = true
  }
  startValue = true
}
console.clear()
const terminalHangman = new TerminalHangman(startValue, testSettings)

terminalHangman.startMenu()
