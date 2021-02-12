// It will require and run our main fetch function.
const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//     if (error) {
//         console.log("It didn't work!", error);
//         return;
//     }

//     console.log('It worked! Return IP:', ip);
// })

const { fetchCoordsByIP } = require('./iss');

// fetchCoordsByIP('108.172.154.235', (error, location) => {
//     if (error) {
//         console.log("No worky", error);
//         return;
//     }
//     console.log("worky!", location)
//     return;
// } )

const { fetchISSFlyOverTimes } = require('./iss');
// fetchISSFlyOverTimes ({ latitude: '49.27670', longitude: '-123.13000' }, (error, flyoverTimes) => {
//     if (error) {
//         console.log("Does not work");
//         return;
//     }
//     console.log("works!", flyoverTimes)
// })

// index.js

const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, flyoverTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(flyoverTimes);
});


