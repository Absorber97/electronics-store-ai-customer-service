const express = require('express');
const router = express.Router();
const customerServiceController = require('../controllers/customerServiceController');

router.post('/customer-service', customerServiceController.handleCustomerQuery);

module.exports = router;