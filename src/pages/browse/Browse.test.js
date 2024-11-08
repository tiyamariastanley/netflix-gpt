import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MovieTrailer from "./components/MovieTrailer";
import { Provider } from "react-redux";
import store from "../../store";
import "@testing-library/jest-dom";
import Browse from "./Browse";
import MOCK_MOVIES_DATA from "../../../__mocks__/MoviesMockData.json";
import MOCK_TRAILER_DATA from "../../../__mocks__/MovieTrailerMockData.json";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import MoviePage from "../movieDetails/MoviePage";

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

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

it("should check if movie cards are loaded properly", async () => {
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return MOCK_MOVIES_DATA;
      },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return MOCK_MOVIES_DATA;
      },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return MOCK_MOVIES_DATA;
      },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return MOCK_MOVIES_DATA;
      },
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_TRAILER_DATA,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => MOCK_TRAILER_DATA,
    });

  await act(() =>
    render(
      <MemoryRouter initialEntries={["/browse"]}>
        <Provider store={store}>
          <Routes>
            <Route path="/browse" element={<Browse />} />
            <Route path="/movie/912649" element={<MoviePage />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    )
  );

  await waitFor(() => {
    const movieCards = screen.getAllByTestId(/movie-card/);
    expect(movieCards.length).toBe(80);
    const trailerTitle = screen.getByText("Venom: The Last Dance");
    expect(trailerTitle).toBeInTheDocument();
    fireEvent.click(movieCards[0]);
    expect(screen.getByText(/126 Comments/)).toBeInTheDocument();
  });
});
