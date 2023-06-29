const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const dotenv = require('dotenv');
const app = express();
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

// const customers =[
//     {
//         name: "Aniket",
//         industry: "Pop music"
//     },{
//         name: "Khali",
//         industry: "wrestling"
//     },{
//         name:"Akshay Kumar",
//         industry: "Artist"
//     }
// ];

const customer =new Customer.customer({
    name: "Devil",
    industry: "Hell"
});
// customer.save();

const user = new Customer.user({
    walletAddress: "0xfaahbksnfkansoiewinajsnfjasda",
    numOfSeeds: 5,
    manureBags: 2,
    treesGrown: 5,
    level: 10,
    nftsEarned: 8

})
// user.save()
    

//  for the seed document
const seed = new Customer.seed({
    seedId: 2,
    stage: 2,
    seedOwner: "Diablo",
    coordinates: "441.0.109",
    seedType: "Sappling",
    age: 8,
    hrsToDie: 20,
    seedHealth: "Healthy",
    isTree: true,
    isDead: false
});

app.get('/',(req,res) => {
    res.json(seed);
});

app.get('/api/customers', async (req,res) => {
    try {
        const result = await Customer.customer.find();
        res.json({"Customers": result});
    } catch (e) {
        res.status(500).json({error: e.message});
    }    
});

app.get('/api/customers/:id', async(req, res) => {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try {
        const customerId = req.params.id;
        console.log(customerId);
        const customer = await Customer.customer.findById(customerId);
        console.log(customer);
    
        if(!customer){
            res.status(404).json({error: 'user not found'});
        }
        else{
            res.json({customer});
        }
        
    } catch (e) {
        res.status(500).json({error: 'something went wrong' })
    }
});

app.put('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
    const result = await Customer.customer.findOneAndReplace({_id: customerId}, req.body, {new : true});
    // console.log(result);
    res.json({result});
    } catch (e) {
        req.status(500).json({error: 'Something went wrong'});
    }
});

app.post('/', (req, res) => {
    res.send('This is a post request!');
});

//for the customer document
app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer.customer(req.body);
    try {
        await customer.save();
        res.status(201).json({customer}); 
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

//for the seed document
app.post('/api/seeds', async (req, res) => {
    console.log(req.body);
    const seed = new Customer.seed(req.body);
    try {
        await seed.save();
        res.status(201).json({seed}); 
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

//for the user document
app.post('/api/users', async (req, res) => {
    console.log(req.body);
    const user = new Customer.user(req.body);
    try {
        await user.save();
        res.status(201).json({user}); 
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});


app.put('/api/customers/seeds/:id', async (req, res) => {
    try {
        const seedId = req.params.id;
        console.log(seedId);
        const result = await Customer.seed.findOneAndReplace({_id: seedId}, req.body, {new : true});
        console.log(result);
        res.json({result});
    } catch (e) {
        req.status(500).json({error: 'Something went wrong'});
    }
});


const start = async() => { 
    try {
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
        console.log('App listening on port:' + PORT)
    });
    } catch (e) {
        console.log(e.message)
    }
    
};

start();