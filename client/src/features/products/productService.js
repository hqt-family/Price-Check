import axios from "axios";

const API_URL = "https://hammerhead-app-wjzp7.ondigitalocean.app/products/";

const getAll = async (options) => {
  const response = await axios.get(API_URL + "all", { params: options });
  return response.data;
};

const getFilter = async (options) => {
  const response = await axios.get(API_URL + "filter", { params: options });
  return response.data;
};

const productServices = {
  getAll,
  getFilter,
};

export default productServices;
