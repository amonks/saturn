var menubar = require('menubar')
var BrowserWindow = require('browser-window')

require('electron-debug')()
var ipc = require('ipc')



var mb = menubar({
  preloadWindow: true,
  x: 0,
  y: 0
})

mb.on('ready', function ready () {
  console.log('app is ready')
  var atomScreen = require('screen')
  var size = atomScreen.getPrimaryDisplay().workAreaSize
  mb.setOption('x', size.width - 420)
})

ipc.on('terminate', function terminate (ev) {
  mb.app.terminate()
})

ipc.on('notify', function show (ev) {
  mb.showWindow()
})
