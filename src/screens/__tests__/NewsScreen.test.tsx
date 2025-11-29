const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  getParent: jest.fn(() => ({ navigate: mockNavigate })),
  isFocused: () => true,
};

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => mockNavigation,
  useRoute: () => ({ params: {} }),
}));

import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
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

  it("Can scroll to bottom and refresh", () => {
    render(<NewsScreen />, { wrapper });
    const newsList = screen.getByTestId("news-list");
    expect(newsList).toBeTruthy();
    fireEvent(newsList, "onEndReached");
    fireEvent(newsList, "onRefresh");
  });

  it("Can hide a news item", () => {
    render(<NewsScreen />, { wrapper });
    const newsList = screen.getByTestId("news-list");
    expect(newsList).toBeTruthy();
    fireEvent.press(screen.getAllByTestId("news-item-hidden")[0]);
    expect(screen.queryByText("Test News Item 1")).toBeFalsy();
  });

  it("Can tap in a news article", async () => {
    render(<NewsScreen />, { wrapper });
    fireEvent.press(screen.getByText("Test News Item 1"));
    expect(mockNavigate).toHaveBeenCalledWith("NewDetail", { id: "1" });
  });

  it("Can toggle started", () => {
    render(<NewsScreen />, { wrapper });
    const started = screen.getAllByTestId("news-item-started")[0];
    fireEvent.press(started);
    expect(started.props["aria-selected"]).toBeTruthy();
    fireEvent.press(started);
    expect(started.props["aria-selected"]).toBeFalsy();
  });
});
