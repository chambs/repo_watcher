// /repos/w3c/encrypted-media/notifications?all=true

var FIELDS = {
  USER: 'github_user',
  TOKEN: 'github_token',
  PATH: 'github_path'
};

retriveFields();
/**
url: string
method: string
headers: {key: string, value: string}
*/
function xhr(url, method, headers, payload) {

  var p = new Promise(function (res, rej) {
    var x = new XMLHttpRequest();
    var key;
    x.open(method || 'GET', url);
    headers = headers || {};

    for (key in headers) {
      if (headers.hasOwnProperty(key)) {
        x.setRequestHeader(key, headers[key]);
      }
    }

    x.addEventListener('load', function (ev) {
      var target = ev.target;
      var statusCode = target.status;
      if (statusCode === 200) {
        res(target);
      } else {
        rej(target);
      }
    });

    x.addEventListener('error', function (ev) {
      rej(ev.target);
    });

    x.send(payload || null);
  });

  return p;
}

function get(path, headers) {
  var p = xhr('https://api.github.com' + path, 'GET', headers || {});
  return p;
}

function saveFields() {
  localStorage.setItem(FIELDS.USER, qs('[name="' + FIELDS.USER + '"]').value);
  localStorage.setItem(FIELDS.TOKEN, qs('[name="' + FIELDS.TOKEN + '"]').value);
  localStorage.setItem(FIELDS.PATH, qs('[name="' + FIELDS.PATH + '"]').value);
}

function retriveFields(name) {
  qs('[name="' + FIELDS.USER + '"]').value = localStorage.getItem(FIELDS.USER);
  qs('[name="' + FIELDS.PATH + '"]').value = localStorage.getItem(FIELDS.PATH);
  qs('[name="' + FIELDS.TOKEN + '"]').value = localStorage.getItem(FIELDS.TOKEN);
}

function showError(text, timeInMs) {
  var msg = qs('#message');
  msg.textContent = text;
  msg.className = msg.className.replace(/hidden/g, '');
  setTimeout(function () {
    msg.className += ' hidden';
  }, timeInMs || 5000);
}

function qs(query, all, parent) {
  parent = parent || document;
  var method = all ? 'querySelectorAll' : 'querySelector';
  return parent[method](query);
}

// events
qs('button[name="btn_send"]').addEventListener('click',
  function (ev) {
    ev.preventDefault();
    var user, password, token, log, path;
    user = qs('[name="github_user"]').value;
    password = qs('[name="github_password"]').value;
    token = qs('[name="github_token"]').value;
    path = qs('[name="github_path"]').value || '/applications/grants';
    log = qs('[name="log"]');

    get(path, {
      Authorization: 'Basic ' + btoa(user + ':' + password),
      'X-GitHub-OTP': token
    }).then(function (xhr) {
      log.value = xhr.response;
    }).catch(function (xhr) {
      var response = xhr.response;

      if (xhr.getResponseHeader('Content-Type').match(/json/i)) {
        response = JSON.parse(response);
      }

      // console.log('failed', xhr);
      showError('Error: ' + response.message);
    });
});

window.onbeforeunload = function () {
  saveFields();
};


qs('#login').addEventListener('click', function (ev) {
  // ev.preventDefault();
});
