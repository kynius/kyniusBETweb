import axios from "axios";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies();
const token = cookies.get('token');
let web = 'https://kyniusbetapi.gadzina.biz/';
// let local = 'https://localhost:5001/';
    export const getRequest = axios.create({
        baseURL: web,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        method: "GET"
    });
    export const postRequest = axios.create({
        baseURL: web,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*'
        },
        method: "POST"
    });
