import axios from 'axios';
const config = require("../config");

// Make a request to get all users
export function getAllUsers(token) {
  return axios(`${config.API.BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
}

// Get user by ID
export function getUserById(token, id) {
  return axios(`${config.API.BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
}

// Update a user
export function updateUser(token, userId, data) {
  return axios(`${config.API.BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(data),
  }).then((response) => response.data);
}

// Delete a user
export function deleteUser(token, userId) {
  return axios(`${config.API.BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
}
