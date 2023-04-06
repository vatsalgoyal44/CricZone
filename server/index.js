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

app.get('/teamallmatchinfo/:teamid', async (request, response) => {
  User.getteamallmatchinfo(request, response)
});

app.get('/matchcard/:matchid', async (request, response) => {
  User.getmatchcard(request, response)
});

app.get('/teamplayerstats/:teamid', async (request, response) => {
  User.getteamplayerstats(request, response)
});

app.get('/matchinfo/:matchid',async(request,response) => {
  User.getmatchinfo(request,response)
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })  
