import { HNApiResponseSchema, DocumentSchema } from "../schemas/news";
import { isNetworkError } from "../utils/isNetworkError";

type NewQueries = "mobile" | "ios" | "android";

export async function getNews(page: number, query: NewQueries = "mobile") {
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${query}&page=${page}`;

  console.log("Fetching news from:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data:", data);

    try {
      const parsed = HNApiResponseSchema.parse(data);
      return parsed;
    } catch (parseError) {
      console.error("Validation error:", parseError);
      throw new Error("Failed to validate API response");
    }
  } catch (error) {
    console.error("Error in getNews:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      isNetworkError: isNetworkError(error),
    });

    if (isNetworkError(error)) {
      throw new Error(
        "Unable to connect to the server. Please check your internet connection."
      );
    }

    throw error;
  }
}

export async function getNewsById(id: string) {
  const url = `https://hn.algolia.com/api/v1/items/${id}`;
  console.log("Fetching news item:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error for news item:", {
        id,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received news item data:", data);

    try {
      return DocumentSchema.parse(data);
    } catch (parseError) {
      console.error("Validation error for news item:", {
        id,
        error: parseError,
      });
      return null;
    }
  } catch (error) {
    console.error("Error in getNewsById:", {
      id,
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      isNetworkError: isNetworkError(error),
    });

    if (isNetworkError(error)) {
      return null;
    }

    throw error;
  }
}
