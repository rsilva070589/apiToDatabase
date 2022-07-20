const integrationService = require('./src/services/integrationService');

async function startup() {
  integrationService.getAndSaveData()
}

startup(); 

 