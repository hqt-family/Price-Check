import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authServices = {
  login,
};

export default authServices;
