// src/lib/api/errors.ts

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function normalizeApiError(error: any): ApiError {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  const status = error?.response?.status;

  return new ApiError(message, status);
}
