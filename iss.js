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

const fetchCoordsByIP = function (ip, callback) {
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

const fetchISSFlyOverTimes = function (coords, callback) {
  const URL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, body) => {
    if (error) {
      callback(error, null)
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyoverTimes = JSON.parse(body)['response'];
    callback(null, flyoverTimes);
  }
  )
};

const nextISSTimesforMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP((error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, flyoverTimes) => {
        if (error) {
          return callback(error, null);
        }
        for (let pass of flyoverTimes) {
          const date = new Date(flyover.risetime * 1000);
          console.log(`next pass at ${date} for ${flyover.duration} seconds!`)
        }

        
      })
    })
  })
}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesforMyLocation };