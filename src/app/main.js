'use strict'

var menubar = require('menubar')

require('electron-debug')()
var ipc = require('ipc')

let options = {
  preloadWindow: true,
  x: 0,
  y: 0,
  width: 500,
  height: 600
}

var mb = menubar(options)

mb.on('ready', function ready () {
  console.log('app is ready')
  var atomScreen = require('screen')
  var size = atomScreen.getPrimaryDisplay().workAreaSize
  mb.setOption('x', size.width - options.width)
})

ipc.on('terminate', function terminate (ev) {
  mb.app.terminate()
})

ipc.on('notify', function show (ev) {
  mb.showWindow()
})
