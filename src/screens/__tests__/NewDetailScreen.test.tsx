import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render, screen, waitFor } from "@testing-library/react-native";
import wrapper, { testQClient } from "../../test/wrapper";
import NewDetailScreen from "../NewDetailScreen";
import { InfiniteData } from "@tanstack/react-query";
import { HNApiResponse, HNArticle } from "../../schemas/news";

describe("NewDetailScreen", () => {
  // Create a test wrapper with navigation
  const TestWrapper = ({ id }: { id: string }) => {
    const Stack = createNativeStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NewDetail"
          component={NewDetailScreen}
          initialParams={{ id }}
        />
      </Stack.Navigator>
    );
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("shows loading indicator while loading", () => {
    const { getByTestId } = render(<TestWrapper id="loading" />, { wrapper });
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("displays article when loaded successfully", async () => {
    render(<TestWrapper id="1" />, { wrapper });

    await waitFor(() => {
      expect(screen.getByTestId("article-view")).toBeTruthy();
    });
  });
  it("shows not found when article is not found", async () => {
    render(<TestWrapper id="not-found" />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("not-found")).toBeTruthy();
    });
  });

  it("handles error state", async () => {
    render(<TestWrapper id="error" />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("not-found")).toBeTruthy();
    });
  });

  it("success for comment text", async () => {
    render(<TestWrapper id="comment-text" />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("article-view")).toBeTruthy();
    });
  });

  it("Success for url", async () => {
    render(<TestWrapper id="url" />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("article-view")).toBeTruthy();
    });
  });

  it("Success not found when article is empty", async () => {
    render(<TestWrapper id="empty" />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("article-view").props).toMatchObject(
        expect.objectContaining({
          source: {
            html: "<b>No data found</b>",
          },
        })
      );
    });
  });

  it("Gets from news cache", async () => {
    const hit: HNArticle = {
      objectID: "cached-1",
      title: "Test News Item 1",
      url: "https://example.com/1",
      points: 42,
      author: "testuser1",
      created_at: new Date().toISOString(),
      created_at_i: Math.floor(new Date().getTime() / 1000),
      story_text: "Testing item from general cache",
      num_comments: 5,
    };
    testQClient.setQueryData(["news"], {
      pageParams: [0],
      pages: [
        {
          hits: [hit],
          hitsPerPage: 20,
          nbHits: 1,
          nbPages: 1,
          page: 0,
          processingTimeMS: 1,
          query: "mobile",
          params: "tags=story&query=mobile&page=0",
        },
      ],
    });
    render(<TestWrapper id="cached-1" />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("article-view")).toBeTruthy();
    });
    const source = await screen.findByTestId("article-view");
    expect(source.props.source.html).toContain(hit.story_text);
  });
});
