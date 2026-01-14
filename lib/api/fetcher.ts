// src/lib/api/fetcher.ts

import { AxiosRequestConfig } from "axios";
import { apiClient } from "./client";
import { ApiRequest } from "./types";

export async function fetcher<TResponse, TRequest = unknown>(
  request: ApiRequest<TRequest>
): Promise<TResponse> {
  const config: AxiosRequestConfig = {
    url: request.url,
    method: request.method ?? "GET",
    data: request.data,
    params: request.params,
    headers: request.headers,
    withCredentials: true,
  };

  const response = await apiClient.request<TResponse>(config);
  return response.data;
}
