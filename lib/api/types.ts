// src/lib/api/types.ts

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiRequest<T = unknown> {
  url: string;
  method?: HttpMethod;
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}
