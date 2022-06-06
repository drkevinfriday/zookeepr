const fs = require("fs")
const path = require("path")
 
 // ****** New Section: Functions*****

  // function to filter the data 
function filterByQuery(query, zookeepers) {


  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = zookeepers;
      
      if(query.age){  
          filteredResults = filteredResults.filter(
        // Since our form data will be coming in as strings, and our JSON is storing
        // age as a number, we must convert the query string to a number to
         // perform a comparison:
          (zookeeper) => zookeeper.age === Number(query.age));
  
      }


      if(query.favoriteAnimal){
          filteredResults = filteredResults.filter(zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal);
  
      }
      if(query.name){
          filteredResults = filteredResults.filter((zookeeper) => zookeeper.name === query.name);
  
      }
       return filteredResults
  
  }
function findById(id, zookeepers) {
const results  = zookeepers.filter((zookeeper) => zookeeper.id=== id)[0]
return results
}

function createNewZookeeper(body, zookeepers) {
console.log(body);
// our function's main code will go here!
const animal = body;

zookeepers.push(animal)

fs.writeFileSync(
    path.join(__dirname, '../data/zookeepers.json'),
    JSON.stringify({zookeepers}, null, 2)
);


// return finished code to post route for response
return animal;
}

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== 'string') {
      return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== 'number') {
      return false;
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
      return false;
    }
    return true;
  }

  module.exports = {
      filterByQuery,
      findById,
      createNewZookeeper,
      validateZookeeper
  }