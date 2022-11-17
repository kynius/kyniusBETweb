import axios from "axios";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies();
const token = cookies.get('token');
    export const getRequest = axios.create({
        baseURL: 'https://kyniusbetapi.gadzina.biz/',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        method: "GET"
    });
    export const postRequest = axios.create({
        baseURL: 'https://kyniusbetapi.gadzina.biz/',
        headers: {'Authorization': 'Bearer ' + token},
        method: "POST"
    });
