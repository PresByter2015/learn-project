let getJSON = function (url) {
  let promise = new Promise(function (resolve, reject) {
    let client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        return resolve(this.response);
      } else {
        return reject(new Error(this.statusText));
      }
    }
  });

  return promise;
};

module.exports = getJSON;
