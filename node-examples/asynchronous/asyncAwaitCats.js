/*
 * See README for details
 */
const axios = require('axios');
const fs = require('fs').promises;

async function saveCats() {
    try {
        console.log('start');
        let response = await axios.get('https://catfact.ninja/breeds');
        console.log('end');
        let catList = '';
        response.data.data.forEach(cat => {
            catList += `${cat['breed']}, ${cat['country']}\n`;
        });
        console.log('fs start');
        await fs.writeFile('asyncAwaitCats.csv', catList);
        console.log('fs end');
    } catch (error) {
        console.error(`Could not save the cat breeds to a file: ${error}`);
    }
}

console.log('total start');
saveCats();
console.log('total end');
