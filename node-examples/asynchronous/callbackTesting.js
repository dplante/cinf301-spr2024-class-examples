/*
 * See: README for details
 */

const request = require('request');

request('https://catfact.ninja/breeds', (error, response, body) => {
    let keys = Object.keys(response);
    console.log(keys);

    for (key in response) {
        const resp = response[key];
        if (resp !== Object(resp) && key !== 'body') {
            console.log(`${key}: ${resp}`);
        }
    }

    console.log(response.toJSON());
});
