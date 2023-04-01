import axios from "axios";

const API_URL = "http://localhost:8000/embed/products/";

const call_apiProduct = async (options) => {
  const response = await axios.get(API_URL, { params: options });
  return response.data;
};


const productServices = {
  call_apiProduct
};

export default productServices;
