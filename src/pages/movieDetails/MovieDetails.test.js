import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import MoviePage from "./MoviePage";
import store from "../../store";

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

test("if movie details page - Comment section loaded correctly", () => {
  render(
    <MemoryRouter initialEntries={["/movie/698687"]}>
      <Provider store={store}>
        <MoviePage></MoviePage>
      </Provider>
    </MemoryRouter>
  );

  const commentSection = screen.getByText(/126 Comments/);
  const commentCard = screen.getAllByTestId("comment-card");
  expect(commentSection).toBeInTheDocument();
  expect(commentCard.length).toBe(9);
});

test("if movie details page - Live section loaded correctly", async () => {
  Object.defineProperty(global, "performance", {
    writable: true,
  });
  jest.useFakeTimers("modern");
  render(
    <MemoryRouter initialEntries={["/movie/698687"]}>
      <Provider store={store}>
        <MoviePage></MoviePage>
      </Provider>
    </MemoryRouter>
  );

  const liveSection = screen.getByText(/LiveChat/);
  expect(liveSection).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(3000));

  await waitFor(() =>
    expect(screen.getAllByTestId("live-comment").length).toBe(3)
  );
});

test("Movie details page - Live section input functionality", async () => {
  render(
    <MemoryRouter initialEntries={["/movie/698687"]}>
      <Provider store={store}>
        <MoviePage></MoviePage>
      </Provider>
    </MemoryRouter>
  );

  const liveInput = screen.getByPlaceholderText(/Type a message../);
  const sendButton = screen.getByRole("button", { name: "Send" });
  fireEvent.change(liveInput, { target: { value: "Kerala day" } });
  fireEvent.click(sendButton);

  await waitFor(() => {
    const messages = screen.getAllByTestId("live-comment");
    expect(messages[0]).toHaveTextContent("Kerala day"); //Because messages are reversed in the code to get the live chat feel
  });
});
