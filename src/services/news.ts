import { HNApiResponseSchema, HNArticleSchema } from "../schemas/news";
import { isNetworkError } from "../utils/isNetworkError";

type NewQueries = "mobile" | "ios" | "android";

export async function getNews(
  page: number,
  query: NewQueries = "mobile",
  since?: number
) {
  const url = new URL("https://hn.algolia.com/api/v1/search_by_date");
  url.searchParams.set("tags", "story");
  url.searchParams.set("query", query);
  url.searchParams.set("page", page.toString());

  if (since) {
    url.searchParams.set("numericFilters", `created_at_i>${since}`);
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

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

    try {
      return HNApiResponseSchema.parse(data);
    } catch (parseError) {
      console.error("Validation error:", parseError);
      throw new Error("Failed to validate API response");
    }
  } catch (error) {
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

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

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

    try {
      return HNArticleSchema.parse(data);
    } catch (parseError) {
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
