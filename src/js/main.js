// main.js

/* global $ Saturn Handlebars Analyst */

$(function () {

  let render = function (data) {
    console.log('rendering')
    $('#analysis').addClass('hidden')
    $('#data').empty()

    if (data.length > 0) {
      $('#analysis').removeClass('hidden')

      let analysis = analyst.analyze(data)

      for (let tag in analysis.counts) {
        let count = analysis.counts[tag]
        let html = Handlebars.templates.analysis({
          count: count,
          tag: tag,
          percentage: (count * 100) / analysis.total | 0
        })
        $('#data').append(html)
      }
    }
  }

  // play a sound
  let snd = false
  let ping = function () {
    console.log('pinging')
    snd = snd || new window.Audio('ping.mp3')
    snd.play()
  }

  // show browser notification
  let notify = function (text) {
    console.log('notify: ', text)
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      return false

    // Let's check whether notification permissions have already been granted
    } else if (window.Notification.permission === 'granted') {
      // If it's okay let's create a notification
      return new window.Notification(text)

    // Otherwise, we need to ask the user for permission
    } else if (window.Notification.permission !== 'denied') {
      window.Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          return new window.Notification(text)
        }
      })
    }
  }

  // show form
  let ask = function (partial) {
    ping()
    notify('What are you doing?')

    let html = Handlebars.templates.form(partial)
    $('#forms').prepend(html)

    $('.tag').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'tags',
      source: substringMatcher(analyst.analyze(saturn.data()))
    })

    listen(partial)
  }

  let substringMatcher = function (strs) {
    return function findMatches (q, cb) {
      let matches, substrRegex

      // an array that will be populated with substring matches
      matches = []

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i')

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str)
        }
      })

      cb(matches)
    }
  }

  // handle new-data form
  let listen = function (partial) {
    let form = $('#' + partial.id)

    form.submit(function (event) {
      event.preventDefault()

      // get tag
      let tag = form.find('.tag.tt-input').val()

      // validate tag
      if (tag.length === 0) {
        form.addClass('has-error')
        return false
      }

      // complete datum
      partial.tag = tag

      // send to saturn
      saturn.add(partial)

      // remove form
      $('#' + partial.id).remove()
    })
  }

  let saturn = new Saturn()
  let analyst = new Analyst()

  saturn.subscribe(render)

  $('#clear').click(saturn.clear)

  saturn.start({
    prompt: ask,
    minutes: 40,
    askFirst: false
  })

  render(saturn.data())
})
