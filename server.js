//route that the front-end can request data from.
const {animals}= require('./data/animals.json')

//sets the port 
const PORT =process.env.PORT || 3001;



// importation Require packages and modules for the app
const express = require('express')
// nstantiate of the serveru7`
const app = express()

function findById(id, animalsArray) {
  const results  = animalsArray.filter(animal => animal.id=== id)[0]
  return results
}
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


    //var needed to store requested data in the  request  pull
    let getPullResults = animals

    // res.send('Hello!');  this send a message to back when data is requested 

    if(req.query){

        // results of the fitler data
        results = filterByQuery(req.query,getPullResults);
      
    }

   res.json(results)
   console.log(results)
   
  });

  app.get('/api/animals/:id',(req,res)=>{
    const result = findById(req.params.id, animals)
    if(result){
      res.json(result)
  }else{
    res.send(404)
  }})

  

//use the app var to listen for request on the a certain port
app.listen(PORT,()=>{
    console.log(`API serer now on port ${PORT}!`)
})
