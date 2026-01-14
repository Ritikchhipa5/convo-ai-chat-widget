// src/lib/api/client.ts

import { normalizeApiError } from "@/lib/api/errors";
import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

export const apiClient = axios.create({
  baseURL: BASE_API,
  timeout: 20_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Normalize errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error))
);
