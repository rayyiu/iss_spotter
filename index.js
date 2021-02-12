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

fetchCoordsByIP('108.172.154.235', (error, location) => {
    if (error) {
        console.log("No worky", error);
        return;
    }
    console.log("worky!", location)
    return;
} )


