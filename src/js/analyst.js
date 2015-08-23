// main.js

/* global JSON */

window.Analyst = function () {

  let API = {}

  // main function
  API.analyze = function (data) {
    if (data.length > 0) {
      let out = {
        total: data.length,
        counts: {},
        tags: []
      }
      for (let datum of data) {
        let tag = datum.tag
        if (out.counts[tag]) {
          out.counts[tag] = out.counts[tag] + 1
        } else {
          out.counts[tag] = 1
          out.tags.push(tag)
        }
      }
      return out
    }
  }

  return API
}
