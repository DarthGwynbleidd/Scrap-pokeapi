const axios = require('axios')
const obj = {}
let fs = require('fs');
async function fetchPokemons() {

    const responseToLength = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/`)
    const totalPokemons = responseToLength.data.count

    for (number = 1; number <= totalPokemons; number++) {

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${number}`)

        let french = ''
        let english = response.data.name
        for (const index of response.data.names) {
            if (index.language.name === 'fr')
                french = index.name
        }
        obj[french] = english
        console.log(" ");
        console.log(`Pokemon № ${number} -- French: ${french} ===> English: ${english}`)
        console.log(" ");
        console.log('-----------------------------')
    }

}
fetchPokemons()

setTimeout(() => {
    fs.writeFile("pokemon_translate.json", JSON.stringify(obj), function (err) {
        if (err) throw err;
        if (totalPokemons === Object.keys(obj).length) {
            console.log(`================`);
            console.log(` `);
            console.log(` <---- Congratulations, you have just obtained the complete list of pokemons ---->`);
            console.log(` `);
            console.log(`================`);
        }
        else {
            console.log(` `);
            console.log(`/!\\ unfortunately an error has occurred somewhere, you have not retrieved the complete list of pokemons /!\\`);
            console.log(` `);
        }
    }
    );
}, 50000)
