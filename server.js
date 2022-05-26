//route that the front-end can request data from.
const {animals}= require('./data/animals.json')

// importation Require packages and modules for the app
const express = require('express')
// nstantiate of the server
const app = express()

// function to filter the data 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);

    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);

    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);

    }
     return filteredResults

}

app.get('/api/animals', (req, res) => {

    console.log("console log of the req.query " + req.query)
    //var needed to store requested data in the  request  pull
    let getPullResults = animals

    console.log("console log of the get pull request  " + req.query)
    // res.send('Hello!');  this send a message to back when data is requested 

    if(req.query){

        // results of the fitler data
        results = filterByQuery(req.query,getPullResults);
        console.log("console log of the results after the filter by query  " + req.query)
    }

    res.json(results)
    console.log("console log of the res.json " + results)
   
  });

//use the app var to listen for request on the a certain port
app.listen(3001,()=>{
    console.log('API serer now on port 3001!')
})
