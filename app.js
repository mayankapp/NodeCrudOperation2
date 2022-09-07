const express = require('express');
const axios = require('axios');

// Express configuration Setup
const app = express();
app.use(express.json());

// Database Configuration Setup
const connect = require('./config/database');

//Require TeamController
const teamController = require('./controllers/TeamController');

// ###### Redis #####
const redis = require('redis');
const redisClient = redis.createClient({
    port: 6379,
    host: '127.0.0.1'
});
redisClient.connect();
redisClient.on('connect', function (err) {
    console.log("Redis connected!!");
})

// Routing setup
app.get('/',teamController);
app.get('/home', async (req, res) => {
    let key = "fullDetails";
    const result = {
        id: 1,
        name: "Appscrip",
        city: "Surat",
        state: "Gujarat"
    }
    // await redisClient.flushAll();
    const getCacheData = await redisClient.get(key);
    // console.log(getCacheData);
    if (!getCacheData) {
        console.log(":::::::::::: Set Cache Data ::::::::::");
        const data = await redisClient.set(key, JSON.stringify(result));
        return res.status(200).json({ data });
    } else {
        console.log(":::::::::::: Get Cache Data ::::::::::");
        const data = JSON.parse(getCacheData)
        return res.status(200).json({ data });
    }
});
app.get('/api', async (req, res) => {
    let isCached = false;
    let results;
    try {
        // await redisClient.flushAll();
        let key = "covid19api";
        const cacheResults = await redisClient.get(key);
        if (cacheResults) {
            isCached = true;
            results = JSON.parse(cacheResults);
        } else {
            const apiResponse = await axios.get('https://api.covid19api.com/summary');
            results = apiResponse.data.Countries[77];
            const length = Object.keys(results).length;
            if (length === 0) throw "API returned an empty array";
            await redisClient.set(key, JSON.stringify(results));
        }
        res.send({
            fromCache: isCached,
            data: results,
        });
    } catch (error) {
        console.log(error.message);
        return res.status({ error: error.message });
    }
});
app.post('/create',teamController);
app.patch('/update/:id',teamController);
app.delete('/delete/:id',teamController);

app.listen(4000, async(req, res) => {
    await connect();
    console.log("Server is Running at port : 4000");
});