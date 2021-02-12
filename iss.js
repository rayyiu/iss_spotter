//It will contain most of the logic for
// fetching the data from each API endpoint.
const request = require("request");
const fetchMyIP = function (callback) {
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

const fetchCoordsByIP = function(ip, callback){
  
}
module.exports = { fetchMyIP, fetchCoordsByIP };