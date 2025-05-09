import React, { act } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MOCK_SEARCH_RESULT from "../../__mocks__/SearchMockData.json";
import { Provider } from "react-redux";
import SearchSuggestions from "./components/SearchSuggestions";
import store from "../store";
import { onAuthStateChanged } from "firebase/auth";

jest.mock("../../__mocks__/firebase/auth");

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_SEARCH_RESULT),
    })
  );
});

afterEach(() => fetch.mockClear());

afterAll(() => delete global.fetch);

it("Should check movie search functionlaity", async () => {
  const callback = jest.fn();
  const auth = {};

  onAuthStateChanged(auth, callback);

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
