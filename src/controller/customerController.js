const customerModel = require('../models/customerModel.js');

const getAllCustomers = async(req, res) => {
    let customers = await customerModel.find();
    if(customers) {
        res.json({
            msg:"customers list",
            data:customers
        })
    } else {
        res.json({
            msg:"Failed to get customers list",
            data:{}
        })
    }

}

module.exports = {
    getAllCustomers
}