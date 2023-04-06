const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

const app = express()
const port = 4001
var cors = require('cors');

app.use(cors({origin: 'http://localhost:3000',
credentials: true
}));
app.use(cookieParser());

const User = require('./Models/user.js');
const { request, response } = require('express');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/teaminfo/:teamid', async (request, response) => {
  User.getteaminfo(request, response)
});


// this is how we make a call to functions in user.js

// app.get('/instrstudinfo/:studid', async (request, response) => {
//   User.instrstudgetinfo(request, response)
// });

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })  
