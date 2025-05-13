import axios from 'axios';

const BASE_URL = 'https://mock-api.example.com'; // 可替换为你实际的 API

export async function fetchTasks() {
  const res = await axios.get(`${BASE_URL}/tasks`);
  return res.data;
}

export async function fetchCompanies() {
  const res = await axios.get(`${BASE_URL}/companies`);
  return res.data;
}

export async function createTask(task) {
  const res = await axios.post(`${BASE_URL}/tasks`, task);
  return res.data;
}

export async function updateTask(id, task) {
  const res = await axios.put(`${BASE_URL}/tasks/${id}`, task);
  return res.data;
}

export async function deleteTask(id) {
  const res = await axios.delete(`${BASE_URL}/tasks/${id}`);
  return res.data;
}