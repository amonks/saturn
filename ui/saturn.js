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

  // import data
  API['import'] = function (data) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var datum = _step.value;

        API.add(datum);
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

  // add datapoint
  API.add = function (datum) {
    if (validate(datum)) {
      pushDatum(datum);
    } else {
      console.log('datapoint exists');
    }
  };

  // validate datapoint
  var validate = function validate(datum) {
    if (datum.tag.length === 0 || datum.id.length === 0 || datum.timestamp.length === 0 || datum_exists(datum)) {
      return false;
    } else {
      return true;
    }
  };

  // check if a datapoint is in the data
  var datum_exists = function datum_exists(datum) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = API.data()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var entry = _step2.value;

        if (datum.id === entry.id) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return false;
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
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = subscribers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var callback = _step3.value;

        callback(API.data());
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
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