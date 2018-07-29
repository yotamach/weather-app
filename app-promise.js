const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetvh weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    var address = encodeURIComponent(argv.address);

    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAOZ7S-W0sV7Fiq5hJFBXRusTa_-k4L31c&address=${address}`;

    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find address');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/236fe949102de9e36dc8911db1563866/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}, Its feels like ${apparentTemperature}`);
    }).catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API');
        }else{
            console.log(e.message);
        }
    });