// src/services/api.js
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Get points claim history
export const getPointHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching point history:', error);
    throw error;
  }
};

export const getRankings = async () => {
  try {
    const response = await api.get('/users/rankings');
    return response.data;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
};

export const claimPoints = async (userId) => {
  try {
    const response = await api.post(`/users/${userId}/claim`);
    return response.data;
  } catch (error) {
    console.error('Error claiming points:', error);
    throw error;
  }
};

export const addUser = async (name) => {
  try {
    const response = await api.post('/users', { name });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export default api;
