// main.js

/* global PoissonProcess JSON */

window.Saturn = function () {

  let API = {}

  let params = null

  // start process
  API.start = function (p) {
    params = p
    if (params.askFirst) { ask() }
    let poisson = PoissonProcess.create(params.minutes * 60 * 1000, ask)
    poisson.start()
    console.log('starting. asking every ' + params.minutes + ' minutes')
  }

  // clear data
  API.clear = function () {
    console.log('clearing')
    window.localStorage.removeItem('tagTime')
    publish()
  }

  // get data
  API.data = function () {
    let string = window.localStorage.getItem('tagTime')
    let data = []
    if (string !== null && string.length > 0) {
      let parsed = JSON.parse(string)
      if (Array.isArray(parsed)) {
        data = parsed
      }
    }
    return data
  }

  // import data
  API.import = function (data) {
    for (let datum of data) {
      API.add(datum)
    }
  }

  // add datapoint
  API.add = function (datum) {
    if (validate(datum)) {
      pushDatum(datum)
    } else {
      console.log('datapoint exists')
    }
  }

  // validate datapoint
  let validate = function (datum) {
    if (datum.tag.length === 0 ||
      datum.id.length === 0 ||
      datum.timestamp.length === 0 ||
      datum_exists(datum)
    ) {
      return false
    } else {
      return true
    }
  }

  // check if a datapoint is in the data
  let datum_exists = function (datum) {
    for (let entry of API.data()) {
      if (datum.id === entry.id) {
        return true
      }
    }
    return false
  }

  // push datum to localStorage
  let pushDatum = function (datum) {
    let data = API.data()
    data.push(datum)
    let string = JSON.stringify(data)
    window.localStorage.setItem('tagTime', string)
    publish()
  }

  // new data pubsub
  let subscribers = []
  // subscribe to new data events
  API.subscribe = function (callback) {
    subscribers.push(callback)
  }
  let publish = function () {
    for (let callback of subscribers) {
      callback(API.data())
    }
  }

  // from http://stackoverflow.com/a/2117523/3943439
  let uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // display prompt
  let ask = function () {
    let partial = {
      interval: params.minutes,
      timestamp: new Date(),
      id: uuid()
    }
    params.prompt(partial)
  }

  return API
}
