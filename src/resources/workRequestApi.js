import axios from "../axios-config";
import { getWRL, postWR, homeUrl } from "../config/urls";

const workRequestApi = {
  getHomepage() {
    return axios.get(homeUrl);
  },
  getWRList() {
    return axios.get(getWRL);
  },
  postWorkRequest(data) {
    console.log(data);
    return axios.post(postWR, data);
  }
};

export default workRequestApi;
