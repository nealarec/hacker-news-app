import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewsScreen from "../NewsScreen";
import wrapper from "../../test/wrapper";

describe("NewsScreen", () => {
  it("displays news items after loading", async () => {
    render(<NewsScreen />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Test News Item 1")).toBeTruthy();
      expect(screen.getByText("42 points")).toBeTruthy();
      expect(screen.getByText("by testuser1")).toBeTruthy();
      expect(screen.getByText("5 comments")).toBeTruthy();
    });
  });
});
