// main.js

/* global $ Saturn Highcharts Handlebars Analyst Save FileReader */

$(function () {

  let render = function (data) {
    console.log('rendering')
    $('#analysis').addClass('hidden')

    $('#data').empty()

    if (data.length > 0) {
      $('#analysis').removeClass('hidden')

      let analysis = analyst.analyze(data)

      let chartData = []
      let hueIndex = 0
      for (let entry of analysis.entries()) {
        let hue = (hueIndex / analysis.tags.length) * 360
        entry.color = 'hsl(' + hue + ', 100%, 87.5%)'
        hueIndex += 1

        let html = Handlebars.templates.row(entry)
        $('#data').append(html)

        chartData.push({
          y: entry.count,
          name: entry.tag,
          color: entry.color
        })
      }
      chart(chartData, $('#chart'))
    }
  }

  let chart = function (data, container) {
    container.highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'What you\'ve been doing'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: 'Tags',
        colorByPoint: true,
        data: data
      }]
    })
  }

  // play a sound
  let snd = false
  let ping = function () {
    console.log('pinging')
    snd = snd || new window.Audio('ping.mp3')
    snd.play()
  }

  // export data
  let exportData = function () {
    console.log('exporting')
    Save().download_object(saturn.data(), 'tags.json')
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

    if (saturn.data().length > 0) {
      $('.tag').typeahead({
        source: analyst.analyze(saturn.data()).tags
      })
    }

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

  // read a file
  let importFile = function (e) {
    var file = e.target.files[0]
    if (!file) {
      return
    }
    var reader = new FileReader()
    reader.onload = function (e) {
      var contents = e.target.result
      saturn.import(JSON.parse(contents))
    }
    reader.readAsText(file)

  }

  let saturn = new Saturn()
  let analyst = new Analyst()

  saturn.subscribe(render)

  $('#import').on('change', importFile)
  $('#clear').click(saturn.clear)
  $('#exportButton').click(exportData)

  saturn.start({
    prompt: ask,
    minutes: 40,
    askFirst: false
  })

  render(saturn.data())
})
