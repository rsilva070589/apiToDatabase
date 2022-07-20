const oracledb = require('oracledb');
const configDatabase = require('./configDatabase.js');
 
let conn;

async function initialize() {
  console.log("Starting connection Pool with Oracle database")
  try{
    await oracledb.createPool(configDatabase.hrPool);
  } catch (error){
    console.log("Could not connect Pool to Oracle database."+error)  
    throw error
  }   
} 

async function finish() {  
  console.log("terminating connection Pool to Oracle database")
  if (conn != null) {
    await closeConection()
  }
  try{
    await oracledb.getPool().close(10); 
  } catch (error){
    console.log("Could not close connection Pool with Oracle database."+error)  
  }    
} 
 
function simpleExecute(statement, binds = [], opts = {}) { 
  return new Promise(async (resolve, reject) => {     

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {      
      const result = await conn.execute(statement, binds, opts);
      resolve(result);
    } catch (err) {
      reject(err);
    }  
  }); 
}

async function openConection () {
  console.log("connecting with database")
  try{
    conn = await oracledb.getConnection();
    console.log("Open database connection")
  } catch (error){
    console.log("error opening connection to database. "+error)
    throw error  
  }  
  
}

async function closeConection () {  
  console.log("closing connection with database")
  try{
    conn.close(); 
    conn = null;
    console.log("closed database connection")
  } catch (error){
    console.log("error function closeConection."+error)  
  }  
}


module.exports.initialize = initialize;
module.exports.finish = finish;
module.exports.openConection = openConection;
module.exports.closeConection = closeConection;
module.exports.simpleExecute = simpleExecute;
