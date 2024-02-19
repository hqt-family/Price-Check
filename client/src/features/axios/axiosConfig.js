import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8000",
  //baseURL: "https://hammerhead-app-wjzp7.ondigitalocean.app"
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);

export default httpClient;
