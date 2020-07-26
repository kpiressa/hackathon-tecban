const fs = require('fs');
const path = require("path");
const https = require('https');
const axios = require('axios');

const httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, "../keys/client_certificate.crt")),
    key: fs.readFileSync(path.resolve(__dirname, "../keys/client_private_key.key")),
    rejectUnauthorized: false
  });

module.exports = {

  async allProducts(request, response) {
    
    const result = await axios.get('https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v2.4/personal-current-accounts', { httpsAgent });

    return response.json(result.data);

  }

};