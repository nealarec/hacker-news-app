export interface NetworkError extends Error {
  message: string;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return (
    error instanceof Error &&
    (error.message.includes("Network request failed") ||
      error.message.includes("Failed to fetch"))
  );
}
