const axios = require('axios')
const obj = {}
let fs = require('fs');
let totalAbilities = ''
async function fetchAbilities() {

    // const responseToLength = await axios.get(`https://pokeapi.co/api/v2/ability/`)
    // totalAbilities = responseToLength.data.count
    totalAbilities = 267

    for (number = 1; number <= totalAbilities; number++) {
        let alias = number
        const response = await axios.get(`https://pokeapi.co/api/v2/ability/${alias}`)

        let french = ''
        let english = response.data.name
        for (const index of response.data.names) {
            if (index.language.name === 'fr')
                french = index.name
        }
        obj[french] = english
        console.log(" ");
        console.log(`Capacité (numéro ${number}) -- French: ${french} ===> English: ${english}`)
        console.log(" ");
        console.log('-----------------------------')
    }

}
fetchAbilities()

setTimeout(() => {
    fs.writeFile("./../jsonfiles/abilities_translate.json", JSON.stringify(obj), function (err) {
        if (err) throw err;
        if (totalAbilities === Object.keys(obj).length + 1) {
            console.log(`================`);
            console.log(` `);
            console.log(` <---- Félicitations vous avez bien récupéré la totalité des noms des capacités (${totalAbilities}). ---->`);
            console.log(` `);
            console.log(`================`);
        }
        else {
            console.log(` `);
            console.log(`/!\\ Malheureusement une erreur s'est produite, votre liste n'est pas complete (${Object.keys(obj).length + 1}/${totalAbilities}) /!\\`);
            console.log(` `);
        }
    }
    );
}, 50000)
