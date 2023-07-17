const Country = require('country-state-city').Country;

const getCountries= async (request, response)=>{
    response.json({
        ok: true,
        countries: Country.getAllCountries(),
    })
}
module.exports = {
    getCountries
}