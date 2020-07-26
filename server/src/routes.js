const express = require('express');

const ProductController = require('./controllers/ProductController');
const AccountController = require('./controllers/AccountController');
const BalanceController = require('./controllers/BalanceController');
const TransactionController = require('./controllers/TransactionController');
const ScheduleController = require('./controllers/ScheduleController');

const routes = express.Router();

routes.get('/products', ProductController.allProducts);
routes.get('/accounts', AccountController.allAccounts);
routes.get('/accounts/:id', AccountController.accountsById);
routes.get('/balances', BalanceController.allBalances);
routes.get('/balances/:id', BalanceController.balancesByAccount);
routes.get('/transactions/:id', TransactionController.transactionsByAccount);
routes.get('/schedules/:id', ScheduleController.schedulesByAccount);

module.exports = routes;