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

export const gettournamentinfo = (tour_name) => {
    const res = axios.get(API_URL + "tournament/" + tour_name);
    return res
};

export const getteaminfo = (teamid) => {
    const res = axios.get(API_URL + "teaminfo/" + teamid);
    return res
};