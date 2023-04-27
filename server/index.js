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

app.get('/home', async (request, response) => {
  User.gethome(request, response)
});

app.get('/teaminfo/:teamid', async (request, response) => {
  User.getteaminfo(request, response)
});

app.get('/teamallmatchinfo/:teamid', async (request, response) => {
  User.getteamallmatchinfo(request, response)
});

app.get('/alltournament', async (request, response) => {
  User.getalltournamentinfo(request, response)
});

app.get('/allteam', async (request, response) => {
  User.getallteaminfo(request, response)
});

app.get('/tournament/:tour_name', async (request, response) => {
  User.gettournamentinfo(request, response)
});

app.get('/allmatchinfo', async (request, response) => {
  User.getallmatchinfo(request, response)
});

app.get('/playerinfo/:playerid', async (request, response) => {
  User.getplayerinfo(request, response)
});

app.get('/matchinfo/:matchid',async(request,response) => {
  User.getmatchinfo(request,response)
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })  
