import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import Header from "./Header";
import store from "../store";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

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

test("should check if Log in component loads", () => {
  render(<Login />);
  const heading = screen.getByText(/Sign up now./);
  expect(heading).toBeInTheDocument();
});

it("should check if Signin functionality works", async () => {
  render(<Login />);
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const toggle = screen.getByText(/Sign up now./);
  fireEvent.click(toggle);
  expect(screen.getByRole("heading", { name: "Sign Up" }));

  const signInButton = screen.getByRole("button", { name: "Sign In" });
  const name = screen.getByPlaceholderText(/Full name/);
  const email = screen.getByPlaceholderText(/Email address or mobile number/);
  const password = screen.getByPlaceholderText(/Password/);

  //Wrong email
  fireEvent.change(name, { target: { value: "Arul" } });
  fireEvent.change(email, { target: { value: "arul@.com" } });
  fireEvent.change(password, { target: { value: "Arul@28john" } });
  fireEvent.click(signInButton);

  expect(
    screen.getByText(/Please enter a valid email address./)
  ).toBeInTheDocument();

  //Wrong password
  fireEvent.change(name, { target: { value: "Arul" } });
  fireEvent.change(email, { target: { value: "arul@gmail.com" } });
  fireEvent.change(password, { target: { value: "Arul@" } });
  fireEvent.click(signInButton);

  expect(
    screen.getByText(/Please enter a valid password./)
  ).toBeInTheDocument();

  fireEvent.change(name, { target: { value: "Arul" } });
  fireEvent.change(email, { target: { value: "arul@gmail.com" } });
  fireEvent.change(password, { target: { value: "Arul@28john" } });
  fireEvent.click(signInButton);

  const additionalText = await screen.findByText(/Sign out/);
  expect(additionalText).toBeInTheDocument();
});

// it("should check if Login functionality works", async () => {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>
//         <Login></Login>
//         <Header></Header>
//       </Provider>
//     </BrowserRouter>
//   );

//   const loginButton = screen.getByRole("button", { name: "Sign In" });
//   const email = screen.getByPlaceholderText(/Email address or mobile number/);
//   const password = screen.getByPlaceholderText(/Password/);
//   fireEvent.change(email, { target: { value: "arul@gmail.com" } });
//   fireEvent.change(password, { target: { value: "Arul@28john" } });
//   fireEvent.click(loginButton);

//   await waitFor(() => {
//     //expect(mockDispatch).toHaveBeenCalledWith(addUserInfo(mockUser));
//     expect(screen.getByText(/Arul/)).toBeInTheDocument(); // Expect the username to be displayed
//   });
// });
