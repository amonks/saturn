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

      for (let entry of analysis.entries()) {
        let html = Handlebars.templates.analysis(entry)
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
      source: analyst.analyze(saturn.data()).tags
    })

    listen(partial)
  }

  // handle new-data form
  let listen = function (partial) {
    let form = $('#' + partial.id)

    form.submit(function (event) {
      event.preventDefault()

      // get tag
      let tag = form.find('.tag').val()

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
