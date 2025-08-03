// src/utils/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
  withCredentials: true, // 🔥 ensures cookies are sent with requests
});

export default API;
