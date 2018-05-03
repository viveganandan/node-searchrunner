const axios = require('axios');
const providers = ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'United'];
const webapp = process.env.WEB_APP || 'localhost';

var mergeResults = (left, right) => {
    // Merge sorted left and right arrays
    let i = 0;
    let j = 0;
    let merged = [];
    while (i < left.length && j < right.length) {
        if (left[i].agony <= right[j].agony) {
            merged.push(left[i++]);
        } else {
            merged.push(right[j++]);
        }
    }
    if (i < left.length) {
        merged = merged.concat(left.slice(i));
    }
    if (j < right.length) {
        merged = merged.concat(right.slice(j));
    }
    return merged;
}

var searchProvider = (provider) => {
    // Return promise to search provider
    return axios.get(`http://${webapp}:9000/scrapers/${provider}`);
}

var searchAllProviders = async () => {
    // Return promise to search all providers
    return new Promise((resolve, reject) => {
        // Create a promise for all providers
        var promises = [];
        for (let i = 0; i < providers.length; i++) {
            promises.push(searchProvider(providers[i]));
        }
        // Search all providers
        axios.all(promises).then(axios.spread((...res) => {
            var results = [];
            for (let i = 0; i < res.length; i++) {
                results = mergeResults(results, res[i].data.results);
            }
            resolve(results);
        }), (err) => {
            reject('Unable to search providers');
        });
    });
}

module.exports = {searchAllProviders};
