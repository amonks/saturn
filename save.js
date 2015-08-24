// save.js

/* global WindowBase64 Blob URL JSON $ */

'use strict';

window.Save = function () {

  var API = {};

  API.download_object = function (object, filename) {
    var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(object));
    console.log(url);
    API.download_data_uri(url, filename);
  };

  // function to force-download from a data uri as a filename
  // nb the download="filename" attribute isn't yet supported by safari
  API.download_data_uri = function (dataURI, fileName) {
    var tempUrl = make_url_from_data(dataURI);
    var link = $('<a href="' + tempUrl + '" id="download" download="' + fileName + '" target="_blank"> </a>');
    $('body').append(link);
    $('#download').get(0).click();
  };

  // function to generate a temporary browser index url for a datauri
  // if a data-uri is larger than 2mb, chrome's address bar can't handle it.
  // fortunately, you can blob it and then use a temporary blob url
  var make_url_from_data = function make_url_from_data(dataURI) {
    var blob = make_blob(dataURI);
    var tempUrl = URL.createObjectURL(blob);
    return tempUrl;
  };

  // function to convert a datauri to a blob
  // I'm not totally sure what a blob is, but apparantly they can hold binary data and generate temporary urls.
  // start process
  var make_blob = function make_blob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = WindowBase64.atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], {
      type: mimeString
    });
  };

  return API;
};
//# sourceMappingURL=save.js.map