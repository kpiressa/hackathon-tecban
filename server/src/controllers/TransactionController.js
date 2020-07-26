const fs = require('fs');
const path = require("path");
const https = require('https');
const axios = require('axios');

var SessionControler = require('./SessionController');
var session = new SessionControler();

const headers = {
    'Content-Type': 'application/json', 
    'x-fapi-financial-id': session.financialId, 
    'x-fapi-interaction-id': session.interactionId, 
    'Authorization': session.token
};

const httpsAgent = new https.Agent({
  cert: fs.readFileSync(path.resolve(__dirname, "../keys/client_certificate.crt")),
  key: fs.readFileSync(path.resolve(__dirname, "../keys/client_private_key.key")),    
  rejectUnauthorized: false
});

module.exports = {

    async transactionsByAccount(request, response) {

        const { id } = request.params;
        
        const result = await axios.get(`https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts/${id}/transactions`, { headers: headers, httpsAgent: httpsAgent });

        var locals = new Set();

        for(var transaction in result.data.Data.Transaction) {
            locals.add(result.data.Data.Transaction[transaction].TransactionInformation);
        }
        
        //return response.json(result.data);
        return response.json(Array.from(locals));

    }  

};