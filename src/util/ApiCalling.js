import axios from 'axios';
import { USER_SERVICE_URL } from '../constants/Endpoints';

const CONTENT_TYPE = {
  "Content-Type": "application/json"
};


const USER_API = axios.create({
  baseURL: USER_SERVICE_URL,
  headers: CONTENT_TYPE
});


export {
  USER_API
};
