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

class Recurrency {
    constructor(companyName, amount, currency, paymentDate) {
        this.companyName = companyName;
        this.amount = amount;
        this.currency = currency;
        this.paymentDate = paymentDate;
    }
}

module.exports = {

    async schedulesByAccount(request, response) {

        const { id } = request.params;
        
        const result = await axios.get(`https://rs1.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/accounts/${id}/scheduled-payments`, { headers: headers, httpsAgent: httpsAgent });

        var recurrencies = [];

        for(var scheduledPayment in result.data.Data.ScheduledPayment) {

            if(result.data.Data.ScheduledPayment[scheduledPayment].ScheduledType == 'Arrival') { 

                var companyName = result.data.Data.ScheduledPayment[scheduledPayment].Reference;
                var amount = result.data.Data.ScheduledPayment[scheduledPayment].InstructedAmount.Amount;
                var currency = result.data.Data.ScheduledPayment[scheduledPayment].InstructedAmount.Currency;

                var paymentDate = new Date(result.data.Data.ScheduledPayment[scheduledPayment].ScheduledPaymentDateTime);
                paymentDate = paymentDate.toLocaleDateString();
            
                var recurr = new Recurrency(companyName, amount, currency, paymentDate);
                recurrencies.push(recurr);
            }
        }
        
        return response.json(recurrencies);

    }  

};