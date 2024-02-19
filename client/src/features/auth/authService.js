import httpClient from "../axios/axiosConfig";

//const API_URL = "https://hammerhead-app-wjzp7.ondigitalocean.app/api/user/"

const getUsers = async (permission) => {
  const response = await httpClient.get("/api/user/all", { params: permission }); /* prettier-ignore */
  return response.data;
};

const loginUser = async (userData) => {
  const response = await httpClient.post("/api/user/login", userData); /* prettier-ignore */

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const updateUser = async (userData) => {
  const response = await httpClient.put(`/api/user/update/${userData.id}`, userData) /* prettier-ignore */
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

const authServices = {
  getUsers,
  loginUser,
  updateUser,
  logoutUser,
};

export default authServices;
