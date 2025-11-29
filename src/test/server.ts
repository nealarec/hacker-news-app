import { setupServer } from "msw/native";
import { http, HttpResponse } from "msw";
import { HNArticle, HNApiResponse } from "../schemas/news";
import z from "zod";

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
  }),

  http.get("https://hn.algolia.com/api/v1/items/:id", async ({ params }) => {
    if (params.id === "not-found") {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (params.id === "error") {
      return HttpResponse.json({ error: "Error" }, { status: 500 });
    }

    if (params.id === "comment-text") {
      const response: HNArticle = {
        objectID: String(params.id),
        title: `Test News Item ${params.id}`,
        points: 42,
        author: "testuser1",
        created_at: new Date().toISOString(),
        created_at_i: Math.floor(new Date().getTime() / 1000),
        num_comments: 5,
        comment_text: "Test comment text",
      };
      return HttpResponse.json(response);
    }

    if (params.id === "url") {
      const response: HNArticle = {
        objectID: String(params.id),
        title: `Test News Item ${params.id}`,
        url: "https://example.com/1",
        points: 42,
        author: "testuser1",
        created_at: new Date().toISOString(),
        created_at_i: Math.floor(new Date().getTime() / 1000),
        num_comments: 5,
      };
      return HttpResponse.json(response);
    }

    if (params.id === "empty") {
      const response: HNArticle = {
        objectID: String(params.id),
        title: `Test News Item ${params.id}`,
        points: 42,
        author: "testuser1",
        created_at: new Date().toISOString(),
        created_at_i: Math.floor(new Date().getTime() / 1000),
        num_comments: 5,
      };
      return HttpResponse.json(response);
    }

    const response: HNArticle = {
      objectID: String(params.id),
      title: `Test News Item ${params.id}`,
      url: "https://example.com/1",
      points: 42,
      author: "testuser1",
      created_at: new Date().toISOString(),
      created_at_i: Math.floor(new Date().getTime() / 1000),
      num_comments: 5,
      story_text: "Test story text",
    };
    return HttpResponse.json(response);
  })
);

export default server;
