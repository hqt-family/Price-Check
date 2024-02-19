import axios from "axios";

// const API_URL = "http://localhost:8000/api/prices/";
const API_URL = "https://hammerhead-app-wjzp7.ondigitalocean.app/api/prices/";

const create = async (priceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, priceData, config);
  return response.data;
};

const updates = async (priceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + priceData.id, priceData, config);
  return response.data;
};

const priceService = {
  create,
  updates,
};

export default priceService;
