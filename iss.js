//It will contain most of the logic for
// fetching the data from each API endpoint.
const request = require("request");
const fetchMyIP = function (callback) {
  const URL = 'https://api.ipify.org?format=json';
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const JSONobject = JSON.parse(body);
    const latitude = JSONobject['latitude'];
    const longitude = JSONobject['longitude'];
    const final = {
      latitude: 'latitude',
      longitude: 'longitude'
    };
    callback(null, final);
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP };