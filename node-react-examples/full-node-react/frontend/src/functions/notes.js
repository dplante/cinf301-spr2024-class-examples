import axios from 'axios';
const config = require("../config");

// Make a request to get all notes
export function getAllNotes(token) {
  return axios(`${config.API.BASE_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
}

// Get notes of a user
export function getNotesOfUser(token, userId) {
  return axios(`${config.API.BASE_URL}/notes/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId,
    },
  }).then((response) => response.data);
}

// Create a note
export function createNote(token, userId, data) {
  return axios(`${config.API.BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(data),
    params: {
      userId,
    },
  }).then((response) => response.data);
}

// Update a note
export function updateNote(token, userId, noteId, data) {
  return axios(`${config.API.BASE_URL}/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(data),
    params: {
      userId,
    },
  }).then((response) => response.data);
}

// Delete a note
export function deleteNote(token, userId, noteId) {
  return axios(`${config.API.BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId,
    },
  }).then((response) => response.data);
}
