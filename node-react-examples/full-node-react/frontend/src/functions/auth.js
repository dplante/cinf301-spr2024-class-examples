import axios from 'axios';
const config = require("../config");

// Make a request to create user account
export async function signup(data) {
  return await axios.post(`${config.API.BASE_URL}/auth/signup`, data, {
    headers: {
      "Content-Type": "application/json",
    }
  }
  );
}

export function login(data) {
  return axios(`${config.API.BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  }).then((response) => response.data);
}
