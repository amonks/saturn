// main.js

/* global JSON */

"use strict";

window.Analyst = function () {

  var API = {};

  // main function
  API.analyze = function (data) {
    if (data.length > 0) {
      var out = {
        total: data.length,
        counts: {},
        tags: []
      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var datum = _step.value;

          var tag = datum.tag;
          if (out.counts[tag]) {
            out.counts[tag] = out.counts[tag] + 1;
          } else {
            out.counts[tag] = 1;
            out.tags.push(tag);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return out;
    }
  };

  return API;
};
//# sourceMappingURL=analyst.js.map