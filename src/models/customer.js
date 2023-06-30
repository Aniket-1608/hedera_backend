const { magicLink, useAirdropNFT } = require('@thirdweb-dev/react');
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
        default: "common"
        // required: true
    },
    age: {
        type: Number,
        default:0
        // required: true
    },
    hrsToDie: {
        type: Number,
        dafault:0
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
    },
    isWatered: {
        type: Boolean,
        default: false
        // required: true
    }

});

const seed = mongoose.model('seed', seedsSchema);

seedsSchema.methods.updateAge = function() {
    if(this.isDead != true) {
    const now = new Date();
    const timeDiff = Math.abs(now - this.timeofPlanting);
    const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
    if (hoursDiff >= this.hrsToDie) {
        this.age += Math.floor(hoursDiff / this.hrsToDie);
        this.timeofPlanting = now;
    }
    } else {
        console.log("The sappling is dead.");
    }
  };

  seedsSchema.methods.addManure = function() {
    return(this.age += 2);
    //make an api call to the frontend
  }

  seedsSchema.methods.checkAge = function() {
    if(this.isDead != true){if(this.age <= 4){
        this.stage == "Seed";
        //make an api call to the frontend
    }
    else if(this.age >4 || this.age < 14){
        this.stage == "Plant";
        //make an api call to the frontend
    }
    else {
        this.stage == "Tree";
        this.isTree == true;
        //make an api call to the frontend
    }}
    else {
        this.stage == "Dead";
        //make an api call to the frontend
    }
  }

seedsSchema.methods.seedfitness = function() {
    if(this.isWatered != true){if(this.hrsToDie>12 && this.hrsToDie<=24){
        this.seedHealth == "Green";
        //make an api call to the frontend
    }
    else if(this.hrsToDie>6 && this.hrsToDie<=12){
        this.seedHealth == "Yellow";
        //make an api call to the frontend
    }
    else{
        this.seedHealth == "Red";
        //make an api call to the frontend
    }}
    else {
        this.hrsToDie == 24;
    }
}
seedsSchema.methods.manureBagsLeft = function() {
    this.manureBags -=1;
    //make an api call to the frontend
}

async function main() {
    const seed1 = new seed({
        seedId: 1,
        stage: 'seed',
        seedOwner: 'John Doe',
        timeofPlanting: new Date(),
        coordinates: '1,2',
        seedType: 'common',
        age: 2,
        hrsToDie: 15,
        seedHealth: "red",
        isTree: false,
        isDead: false,
        isWatered: false 
    });
    // let user = seed1;
    // console.log({user});
    // const manureAdded = await user.addManure();
    // console.log({manureAdded});
}
main();


module.exports = {
    customer: customer,
    user: user,
    seed: seed
}