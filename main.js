// main.js

/* global $ Saturn Chart Handlebars Analyst */

'use strict';

$(function () {

  var render = function render(data) {
    console.log('rendering');
    $('#analysis').addClass('hidden');
    $('#data').empty();

    if (data.length > 0) {
      $('#analysis').removeClass('hidden');

      var analysis = analyst.analyze(data);

      var chartData = [];

      var hueIndex = 1;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = analysis.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          var hue = hueIndex / analysis.total * 360;
          chartData.push({
            value: entry.count,
            label: entry.tag,
            color: 'hsl(' + hue + ', 100%, 80%)'
          });
          hueIndex += 1;
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

      var chartOptions = [];
      var ctx = $('#chart').get(0).getContext('2d');
      var chart = new Chart(ctx).Doughnut(chartData, chartOptions);
      $('chart').append(chart);
    }
  };

  // play a sound
  var snd = false;
  var ping = function ping() {
    console.log('pinging');
    snd = snd || new window.Audio('ping.mp3');
    snd.play();
  };

  // show browser notification
  var notify = function notify(text) {
    console.log('notify: ', text);
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      return false;

      // Let's check whether notification permissions have already been granted
    } else if (window.Notification.permission === 'granted') {
        // If it's okay let's create a notification
        return new window.Notification(text);

        // Otherwise, we need to ask the user for permission
      } else if (window.Notification.permission !== 'denied') {
          window.Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
              return new window.Notification(text);
            }
          });
        }
  };

  // show form
  var ask = function ask(partial) {
    ping();
    notify('What are you doing?');

    var html = Handlebars.templates.form(partial);
    $('#forms').prepend(html);

    $('.tag').typeahead({
      source: analyst.analyze(saturn.data()).tags
    });

    listen(partial);
  };

  // handle new-data form
  var listen = function listen(partial) {
    var form = $('#' + partial.id);

    form.submit(function (event) {
      event.preventDefault();

      // get tag
      var tag = form.find('.tag').val();

      // validate tag
      if (tag.length === 0) {
        form.addClass('has-error');
        return false;
      }

      // complete datum
      partial.tag = tag;

      // send to saturn
      saturn.add(partial);

      // remove form
      $('#' + partial.id).remove();
    });
  };

  var saturn = new Saturn();
  var analyst = new Analyst();

  saturn.subscribe(render);

  $('#clear').click(saturn.clear);

  saturn.start({
    prompt: ask,
    minutes: 40,
    askFirst: false
  });

  render(saturn.data());
});
//# sourceMappingURL=main.js.map