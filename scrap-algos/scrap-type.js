const axios = require('axios')
const obj = {}
let fs = require('fs');
async function fetchPokemons() {

    for (i=1; i <= 18 ; i++){
 
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${i}`)
        
        let french = ''
        let english = ''
        for (const index of response.data.names){
            if (index.language.name === 'fr')
                french = index.name
            else if (index.language.name === 'en')
                english = index.name
        }
        obj[english] = french
        console.log(french)
        console.log(english)
    }
    
}
fetchPokemons()

setTimeout(() => { fs.writeFile ("type_translate.json", JSON.stringify(obj), function(err) {
    if (err) throw err;
    console.log(Object.keys(obj).length);
    }
);
  }, 200000)
