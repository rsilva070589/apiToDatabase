const oracledb = require('oracledb');
const database = require('../data/index.js');
  
async function initialize() { 
  try{
    await database.initialize()
  } catch (error){
    console.log("Database not available at the moment. ")  
  }     
}  

async function finish() {   
  try{
    await database.finish();
  } catch (error){
    console.log("Database not closed. ")  
  }      
}

async function saveData (data) { 
  try{
    await database.openConection();
    await recordData(data);
    database.closeConection();
  } catch (error){
    console.log("error in function saveData "+error)
    throw error  
  }  
}

const sqlInsert =
`insert into post  (  userId,  id,  title,  body  )
values  (  :userId,  :id,  :title,  :body   )  ` 

const sqlValidation =
`select id from post where id = :id ` 

async function recordData(data) { 
  try{
    const a = data.map(async i => {        
      var result   = await database.simpleExecute(sqlValidation,  [i.id], { autoCommit: true });
      var verifyID = result.rows[0]    

      if (verifyID  != undefined ) {
        console.log("Topics " + "ID: " +i.id + " already exists in the database")                       
      }else{                
            await database.simpleExecute(sqlInsert, 
            [                                
              i.userId,
              i.id,
              i.title,
              i.body  
            ]
            , { autoCommit: true });
            console.log("Topics " + "ID: " +i.id + " successfully inserted into the database") 
      }          
    }) 
    const r =  await Promise.all(a)
  } catch (error){
    console.log("error in funcion recordData " +error)  
  }  
} 
 
module.exports.initialize = initialize; 
module.exports.finish     = finish; 
module.exports.saveData   = saveData; 
 