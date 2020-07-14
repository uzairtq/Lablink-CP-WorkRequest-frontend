import axios from "axios";

import config from "./config/config";

//TODO: add token management to axios instance

const instance = axios.create({ baseURL: `${config.baseUrl}:${config.port}` });

export default instance;
