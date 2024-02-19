import httpClient from "../axios/axiosConfig";

const call_apiProduct = async (options) => {
  const response = await httpClient.get("/embed/products/", { params: options }); /* prettier-ignore */
  return response.data;
};

const productServices = {
  call_apiProduct,
};

export default productServices;
