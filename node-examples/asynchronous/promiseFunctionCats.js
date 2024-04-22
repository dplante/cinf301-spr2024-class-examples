const axios = require('axios');
const fs = require('fs').promises;

function success(resp) {
    console.log('Successfully retrieved our list of cats');
    let catList = '';
    resp.data.data.forEach(cat => {
        catList += `${cat['breed']}, ${cat['country']}\n`;
    });
    console.log(catList);
}

// What happens without catch() but an error (say go to breedss instead of breeds)
axios.get('https://catfact.ninja/breeds').then(r => success(r));

/* 
 * See: https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution
 * to create synchronous delay, but also note that async/await is considered better 
 * for this!  The method below is slower as it loops continuously rather than being 
 * triggered as part of the event loop.
 */

console.log("Start");

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

wait(3000);
console.log("End");