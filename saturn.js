// main.js

/* global PoissonProcess JSON */

'use strict';

window.Saturn = function () {

  var API = {};

  var params = null;

  // start process
  API.start = function (p) {
    params = p;
    if (params.askFirst) {
      ask();
    }
    var poisson = PoissonProcess.create(params.minutes * 60 * 1000, ask);
    poisson.start();
    console.log('starting. asking every ' + params.minutes + ' minutes');
  };

  // clear data
  API.clear = function () {
    console.log('clearing');
    window.localStorage.removeItem('tagTime');
    publish();
  };

  // get data
  API.data = function () {
    var string = window.localStorage.getItem('tagTime');
    var data = [];
    if (string !== null && string.length > 0) {
      var parsed = JSON.parse(string);
      if (Array.isArray(parsed)) {
        data = parsed;
      }
    }
    return data;
  };

  // add datapoint
  API.add = function (datum) {
    if (validate(datum)) {
      pushDatum(datum);
    }
  };

  // validate datapoint
  var validate = function validate(datum) {
    if (datum.tag.length === 0 || datum.id.length === 0 || datum.timestamp.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  // push datum to localStorage
  var pushDatum = function pushDatum(datum) {
    var data = API.data();
    data.push(datum);
    var string = JSON.stringify(data);
    window.localStorage.setItem('tagTime', string);
    publish();
  };

  // new data pubsub
  var subscribers = [];
  // subscribe to new data events
  API.subscribe = function (callback) {
    subscribers.push(callback);
  };
  var publish = function publish() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var callback = _step.value;

        callback(API.data());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  // from http://stackoverflow.com/a/2117523/3943439
  var uuid = function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  // display prompt
  var ask = function ask() {
    var partial = {
      interval: params.minutes,
      timestamp: new Date(),
      id: uuid()
    };
    params.prompt(partial);
  };

  return API;
};
//# sourceMappingURL=saturn.js.map