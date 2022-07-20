const axios = require('axios'); 
const topicsRepository = require('../repositories/topicsRepository');

var config = {
  method: 'get',
  url: 'https://jsonplaceholder.typicode.com/posts',
  headers: { }
};

async function getAndSaveData () { 
  try {
    await topicsRepository.initialize()
    console.log("getting data API")
    var response = await axios(config);             
    console.log("found " + response.data.length +" Topics")
    await topicsRepository.saveData(response.data)      
  } catch (error) {
    console.log('error in function getAndSaveData ' + error); 
  } finally {
    await topicsRepository.finish()
  }
} 
 
module.exports.getAndSaveData = getAndSaveData;