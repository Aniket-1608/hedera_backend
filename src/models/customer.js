const mongoose = require('mongoose');
 
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String
});
const customer = mongoose.model('customer', customerSchema);

const userSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        default:"",
        required: true
    },
    numOfSeeds: {
        type: Number,
        default: 0
        // required: true
    },
    manureBags: {
        type: Number,
        default:0
        // required: true
    },
    treesGrown: {
        type: Number,
        default:0
        // required: true
    },
    level: {
        type: Number,
        default: 0
        // required: true
    },
    nftsEarned: {
        type: Number,
        default:0
        // required: true
    },
    profilePic: String,
    username: String,
    about: String,
    location: String,
    badges: Number
});
const user = mongoose.model('user', userSchema);

const seedsSchema = new mongoose.Schema({
    seedId: {
        type: Number,
        required: true
    },
    stage: {
        type: String,
        default: "seed"
        // required: true
    },
    seedOwner: {
        type: String,
        required: true
    },
    timeofPlanting: {
        type: String,
        timestamp: true,
    },
    coordinates: {
        type: String,
        required: true
    },
    seedType: {
        type: String,
        default: "common",
        // required: true
    },
    age: {
        type: Number,
        default:0
        // required: true
    },
    hrsToDie: {
        type: Number,
        dafault:24
        // required: true
    },
    seedHealth: {
        type: String,
        dafault:"green"
        // required: true
    },
    isTree: {
        type: Boolean,
        default: false
        // required: true
    },
    isDead: {
        type: Boolean,
        default: false
        // required: true
    }

});
const seed = mongoose.model('seed', seedsSchema);


module.exports = {
    customer: customer,
    user: user,
    seed: seed
}