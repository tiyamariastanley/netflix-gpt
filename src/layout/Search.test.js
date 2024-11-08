import React, { act } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MOCK_SEARCH_RESULT from "../../__mocks__/SearchMockData.json";
import { Provider } from "react-redux";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
import SearchSuggestions from "./components/SearchSuggestions";
import store from "../store";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: {
        uid: "testUID",
        email: "test@example.com",
        displayName: "Test User",
      },
    })
  ),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: {
        uid: "testUID",
        email: "test@example.com",
        displayName: "Test User",
      },
    })
  ),
  signOut: jest.fn(() => Promise.resolve()),
}));

beforeAll(
  () =>
    (global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_SEARCH_RESULT),
      })
    ))
);

afterEach(() => fetch.mockClear());

afterAll(() => delete global.fetch);

it("Should check movie search functionlaity", async () => {
  await act(() =>
    render(
      <Provider store={store}>
        <SearchSuggestions></SearchSuggestions>
      </Provider>
    )
  );

  const searchInput = screen.getByPlaceholderText(/Search for titles, genres/);
  fireEvent.focus(searchInput);
  fireEvent.change(searchInput, { target: { value: "hello" } });

  await waitFor(() => {
    expect(screen.getByText("hello kitty")).toBeInTheDocument();
  });
});
