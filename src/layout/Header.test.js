import React, { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import store from "../store";
import Browse from "../pages/browse/Browse";
import MoviePage from "../pages/movieDetails/MoviePage";
import "../../jest.polyfills";

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

it("should check if Header loaded properly", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header></Header>
        <Login></Login>
      </Provider>
    </BrowserRouter>
  );

  const signOutButton = screen.getByText(/Sign out/);
  fireEvent.click(signOutButton);
  const heading = screen.getByRole("heading", { name: "Sign In" });
  expect(heading).toBeInTheDocument();
});

it("should check if Home button works properly", () => {
  render(
    <MemoryRouter initialEntries={["/movie"]}>
      <Provider store={store}>
        <Header></Header>
        <Routes>
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  const homeButton = screen.getByText(/Home/);
  fireEvent.click(homeButton);
  expect(screen.getByText("More Info")).toBeInTheDocument();
});
