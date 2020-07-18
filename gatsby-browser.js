/* eslint-disable */
import Prism from 'prismjs';
import * as basicLightbox from 'basiclightbox';
import 'lazysizes';
import config from './utils/siteConfig'
import './src/styles/app.less';

/*
 * NOTICE: ES6 module exports are not officially supported because of NodeJs
 * https://github.com/gatsbyjs/gatsby/pull/9239
 *
 * ES6 modules are here used because PrismJS should not work with CommonJs.
 */

export const onRouteUpdate = ({location}) => {

  // Route detection
  getUserSession() // All routes
  let path = location.pathname;
  if ((path.split('/').length - 1) === 2) {
    codeSyntaxHighlight();  // Code Syntax Highlighting
    enableLightboxImages();  // Enable lightbox on post images
  } else if (path.indexOf('author')) {
    scrapeUrlMetadata();  // Author website widget
  }
}

// Posts
// -------------------------------------------
function codeSyntaxHighlight() {
  Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true
  });
  Prism.highlightAll();
}

function enableLightboxImages() {
  let images = document.querySelectorAll('.kg-image-card img');
  if (images.length > 0) {
    for (let image in images) {
      if (image < images.length) {
        images[image].onclick = () => {
          let html = `<img src="` + images[image].getAttribute('src') + `" alt="` + images[image].getAttribute('alt') + `" />`;
          const instance = basicLightbox.create(html, {
            onShow: (instance) => {
              instance.element().style.opacity = 1
            },
            onClose: (instance) => {
              instance.element().style.opacity = 0
            }
          }).show()
        }
      }
    }
  }
}


// Authors
// -------------------------------------------
function scrapeUrlMetadata() {
  let linkElement = document.getElementById('author-website');
  if (linkElement) {
    let url = linkElement.getAttribute('href');
    let client = new HttpClient();
    let endpoint = config.lambda.scrape + url;
    client.get(endpoint, function(response) {
      let data = JSON.parse(response)
      linkElement.innerHTML = '<div class="website-title">' + data['Title'] + '</div>'
                              + '<div class="website-description">' + data['Description'] + '</div>'
                              + '<img src="' + data['Image'] + '" alt="' + data['Title'] + '" class="website-image" />'
    });
  }
}

let HttpClient = function() {
  this.get = function(url, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText);
      }
    httpRequest.open("GET", url, true);
    httpRequest.send(null);
  }
}



// Members
// -------------------------------------------
function getUserSession() {
  let client = new HttpClient();
  let endpoint = config.lambda.user;
  client.get(endpoint, function(response) {
    let data = JSON.parse(response);
    console.log(data);
  });
}
