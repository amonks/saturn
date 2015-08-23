// main.js

/* global $ Saturn Handlebars Analyst */

'use strict';

$(function () {

  var render = function render(data) {
    console.log('rendering');
    $('#analysis').addClass('hidden');
    $('#data').empty();

    if (data.length > 0) {
      $('#analysis').removeClass('hidden');

      var analysis = analyst.analyze(data);

      for (var tag in analysis.counts) {
        var count = analysis.counts[tag];
        var html = Handlebars.templates.analysis({
          count: count,
          tag: tag,
          percentage: count * 100 / analysis.total | 0
        });
        $('#data').append(html);
      }
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
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'tags',
      source: substringMatcher(analyst.analyze(saturn.data()))
    });

    listen(partial);
  };

  var substringMatcher = function substringMatcher(strs) {
    return function findMatches(q, cb) {
      var matches = undefined,
          substrRegex = undefined;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  // handle new-data form
  var listen = function listen(partial) {
    var form = $('#' + partial.id);

    form.submit(function (event) {
      event.preventDefault();

      // get tag
      var tag = form.find('.tag.tt-input').val();

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