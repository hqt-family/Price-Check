import httpClient from "../axios/axiosConfig";

const create = async (priceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await httpClient.post("/api/prices/", priceData, config); /* prettier-ignore */
  return response.data;
};

const updates = async (priceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await httpClient.put(`/api/prices/${priceData.id}`, priceData, config); /* prettier-ignore */
  return response.data;
};

const priceService = {
  create,
  updates,
};

export default priceService;
