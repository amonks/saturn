// main.js

/* global JSON */

window.Analyst = function () {

  let API = {}

  // main function
  API.analyze = function (data) {
    if (data.length > 0) {
      let analysis = {
        total: data.length,
        data: {},
        tags: [],
        entries: function * () {
          for (let key of Object.keys(analysis.data)) {
            yield analysis.data[key]
          }
        }
      }

      // populate data object and tags array
      for (let datum of data) {
        let tag = datum.tag
        if (analysis.data[tag]) {
          analysis.data[tag].count = analysis.data[tag].count + 1
        } else {
          analysis.data[tag] = {
            tag: tag,
            count: 1
          }
          analysis.tags.push(tag)
        }
      }

      // add percentages
      for (let key of Object.keys(analysis.data)) {
        let datum = analysis.data[key]
        datum.percentage = Math.round(100 * datum.count / analysis.total)
      }
      return analysis
    }
  }
  return API
}
