import axios from "axios";

//const API_URL = "http://localhost:8000/api/user/";
const API_URL = "https://hammerhead-app-wjzp7.ondigitalocean.app/api/user/"

const getUsers = async (permission) => {
  const response = await axios.get(API_URL + "all", { params: permission });
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}; 

const updateUser = async (userData) => {
  const response = await axios.put(API_URL + "update/" + userData.id, userData);
  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

const authServices = {
  getUsers,
  loginUser,
  updateUser,
  logoutUser
};

export default authServices;
