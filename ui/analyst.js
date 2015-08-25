// main.js

/* global JSON */

"use strict";

window.Analyst = function () {

  var API = {};

  // main function
  API.analyze = function (data) {
    if (data.length > 0) {
      var _iteratorNormalCompletion2;

      var _didIteratorError2;

      var _iteratorError2;

      var _iterator2, _step2;

      var _iteratorNormalCompletion3;

      var _didIteratorError3;

      var _iteratorError3;

      var _iterator3, _step3;

      var _ret = (function () {
        var analysis = {
          total: data.length,
          data: {},
          tags: [],
          entries: regeneratorRuntime.mark(function entries() {
            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

            return regeneratorRuntime.wrap(function entries$(context$4$0) {
              while (1) switch (context$4$0.prev = context$4$0.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$4$0.prev = 3;
                  _iterator = Object.keys(analysis.data)[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$4$0.next = 12;
                    break;
                  }

                  key = _step.value;
                  context$4$0.next = 9;
                  return analysis.data[key];

                case 9:
                  _iteratorNormalCompletion = true;
                  context$4$0.next = 5;
                  break;

                case 12:
                  context$4$0.next = 18;
                  break;

                case 14:
                  context$4$0.prev = 14;
                  context$4$0.t0 = context$4$0["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = context$4$0.t0;

                case 18:
                  context$4$0.prev = 18;
                  context$4$0.prev = 19;

                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }

                case 21:
                  context$4$0.prev = 21;

                  if (!_didIteratorError) {
                    context$4$0.next = 24;
                    break;
                  }

                  throw _iteratorError;

                case 24:
                  return context$4$0.finish(21);

                case 25:
                  return context$4$0.finish(18);

                case 26:
                case "end":
                  return context$4$0.stop();
              }
            }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
          })
        };

        // populate data object and tags array
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;

        try {
          for (_iterator2 = data[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var datum = _step2.value;

            var tag = datum.tag;
            if (analysis.data[tag]) {
              analysis.data[tag].count = analysis.data[tag].count + 1;
            } else {
              analysis.data[tag] = {
                tag: tag,
                count: 1
              };
              analysis.tags.push(tag);
            }
          }

          // add percentages
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;

        try {
          for (_iterator3 = Object.keys(analysis.data)[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var key = _step3.value;

            var datum = analysis.data[key];
            datum.percentage = Math.round(100 * datum.count / analysis.total);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return {
          v: analysis
        };
      })();

      if (typeof _ret === "object") return _ret.v;
    }
  };
  return API;
};
//# sourceMappingURL=analyst.js.map