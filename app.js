const express = require('express');

// Express configuration Setup
const app = express();
app.use(express.json());

// Database Configuration Setup
const connect = require('./config/database');

//Require TeamController
const teamController = require('./controllers/TeamController');

// Routing setup
app.get('/',teamController);
app.post('/create',teamController);
app.patch('/update/:id',teamController);
app.delete('/delete/:id',teamController);


app.listen(4000, async(req, res) => {
    await connect();
    console.log("Server is Running at port : 4000");
});