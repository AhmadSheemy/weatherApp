// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  

// Start up an instance of app
const app = express();
const port = 3030;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors()); 
// Initialize the main project folder
app.use(express.static('website'));
app.post('/addData', (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.feelings;
})

app.get('/all', (req, res) => {
    res.send(projectData);
})


// Setup Server
const server = app.listen(port,listening);
function listening() {
    console.log(`server is running and listening to port ${port}`);
};