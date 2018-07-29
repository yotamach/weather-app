const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');


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
//console.log(argv)

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude,results.langitude, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${results.temperature}, Its feels like ${results.apparentTemperature}`);
            }
        });
    }
});