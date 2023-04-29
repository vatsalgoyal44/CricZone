import axios from "axios";

const API_URL = "http://localhost:4001/";

export const getalltournament = () => {
    const res = axios.get(API_URL + "alltournament");
    return res
};

export const getallteam = () => {
    const res = axios.get(API_URL + "allteam");
    return res
};

export const getallmatch = () => {
    const res = axios.get(API_URL + "allmatchinfo");
    return res
};

export const gettournamentinfo = (tour_name) => {
    const res = axios.get(API_URL + "tournament/" + tour_name);
    return res
};

export const getteaminfo = (teamid) => {
    const res = axios.get(API_URL + "teaminfo/" + teamid);
    return res;
};

export const getmatchinfo = (match_id) => {
    const res = axios.get(API_URL + "matchinfo/" + match_id);
    return res;
};

export const getallmatches = () => {
    const res = axios.get(API_URL + "allmatchinfo");
    return res;
};

export const getplayerinfo = (playerid) =>{
    const res = axios.get(API_URL + "playerinfo/" + playerid);
    console.log(API_URL + "playerinfo/" + playerid);
    return res;
}

export const gethome = () => {
    const res = axios.get(API_URL + "home");
    return res;
}

export const getpointstable = (tour_name) =>{
    const res = axios.get(API_URL + "tournamentpointstable/" + tour_name)
}