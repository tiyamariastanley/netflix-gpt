import { Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import { routes } from "./components/Routes";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes}>
        <Header />
        <Outlet></Outlet>
        {/* <Footer /> */}
      </RouterProvider>
    </Provider>
  );
}

export default App;
