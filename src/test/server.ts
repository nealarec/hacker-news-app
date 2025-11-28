import { setupServer } from "msw/native";
import { http, HttpResponse } from "msw";
import { HNApiResponse } from "../schemas/news";

const server = setupServer(
  // Mock Hacker News API
  http.get("https://hn.algolia.com/api/v1/search_by_date", async () => {
    const now = new Date();
    const response: HNApiResponse = {
      hits: [
        {
          objectID: "1",
          title: "Test News Item 1",
          url: "https://example.com/1",
          points: 42,
          author: "testuser1",
          created_at: now.toISOString(),
          created_at_i: Math.floor(now.getTime() / 1000),
          num_comments: 5,
          _tags: ["story", "test"],
        },
        {
          objectID: "2",
          title: "Test News Item 2",
          url: "https://example.com/2",
          points: 100,
          author: "testuser2",
          created_at: new Date(now.getTime() - 3600 * 1000).toISOString(),
          created_at_i: Math.floor(now.getTime() / 1000) - 3600,
          num_comments: 10,
          _tags: ["story", "test"],
        },
      ],
      nbHits: 2,
      page: 0,
      nbPages: 1,
      hitsPerPage: 20,
      processingTimeMS: 1,
      query: "mobile",
      params: "tags=story&query=mobile&page=0",
    };
    return HttpResponse.json(response);
  })
);

export default server;
