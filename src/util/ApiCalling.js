import axios from 'axios';
import { USER_SERVICE_URL } from '../constants/Endpoints';

export const FAIL = 'fail';
export const SUCCESS = 'success';

const CONTENT_TYPE = {
  "Content-Type": "application/json"
};

export const USER_API = axios.create({
  baseURL: USER_SERVICE_URL,
  headers: CONTENT_TYPE
});

