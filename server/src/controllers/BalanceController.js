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

    async allBalances(request, response) {
        
        const result = await axios.get('https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts/balances', { headers: headers, httpsAgent: httpsAgent });

        return response.json(result.data);

    },

    async balancesByAccount(request, response) {

        const { id } = request.params;
        
        const result = await axios.get(`https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts/${id}/balances`, { headers: headers, httpsAgent: httpsAgent });

        return response.json(result.data);

  }  

};