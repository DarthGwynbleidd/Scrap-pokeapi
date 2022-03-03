const axios = require('axios')
const obj = {}
let fs = require('fs');
let totalPokemons = ''
async function fetchPokemons() {

    const responseToLength = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/`)
    totalPokemons = responseToLength.data.count

    for (number = 1; number <= totalPokemons; number++) {

        const responseFrench = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${number}`)
        const responseEnglish = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)

        let french = ''
        let english = responseEnglish.data.name
        for (const index of responseFrench.data.names) {
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
            console.log(` <---- Félicitations vous avez bien récupéré la totalité des noms de pokémons (${totalPokemons}). ---->`);
            console.log(` `);
            console.log(`================`);
        }
        else {
            console.log(` `);
            console.log(`/!\\ Malheureusement une erreur s'est produite, votre liste n'est pas complete (${Object.keys(obj).length}/${totalPokemons} /!\\`);
            console.log(` `);
        }
    }
    );
}, 500000)
