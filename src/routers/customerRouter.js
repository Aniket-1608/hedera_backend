const express = require('express');

const {getAllCustomers} = require('../controller/customerController')

const customerRouter = express.Router()

customerRouter  
    .route('/')
    .get(getAllCustomers)

module.exports = customerRouter;