const mongoose = require('mongoose');
const dbLink = ""

mongoose.connect(dbLink)
.then(db=>console.log('db connected'))
.catch(err=>console.log(err))

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String
    }
});

const customerModel = mongoose.model('customerModel', customerSchema)

module.exports = customerModel;
