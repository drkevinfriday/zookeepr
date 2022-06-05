//route that the front-end can request data from.
const {animals}= require('./data/animals.json')

const fs =require('fs');
const path =require('path')


//sets the port 
const PORT =process.env.PORT || 3001;



// importation Require packages and modules for the app
const express = require('express');
const req = require('express/lib/request');
// instantiate of the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'))


// this function uses the id to find animals by id in the array 
function findById(id, animalsArray) {
  const results  = animalsArray.filter(animal => animal.id=== id)[0]
  return results
}
function createNewAnimal(body, animalsArray) {
  console.log(body);
  // our function's main code will go here!
  const animal = body;

  animalsArray.push(animal)

  fs.writeFileSync(
    path.join(__dirname, './data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );


  // return finished code to post route for response
  return animal;
}
// animal validation
function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
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
//filter using the filterbyquery function
app.get('/api/animals', (req, res) => {


    //var needed to store requested data in the  request  pull
    let getPullResults = animals
    // res.send('Hello!');  this send a message to back when data is requested 
    if(req.query){
        // results of the fitler data
        results = filterByQuery(req.query,getPullResults);      
    }
    //sends a response as a json file to the client
   res.json(results)
    // console.logs the results of the  
   console.log(results)
   
  });


//filter by id 
app.get('/api/animals/:id',(req,res)=>{
    const result = findById(req.params.id, animals)
    if(result){
      res.json(result)
  }else{
    res.send(404)
  }})


app.post('/api/animals', (req, res) => {


  // req.body is where our incoming content will be
  req.body.id = animals.length.toString()

  if(!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted.');
  } else{
     //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals)

    console.log(animal);
  
    res.json(animal);

  }

 //test
 
});
// this display the request webpage to the browser
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/index.html'))
})

  

//use the app var to listen for request on the a certain port
app.listen(PORT,()=>{
    console.log(`API serer now on port ${PORT}!`)
})
