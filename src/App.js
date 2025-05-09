import {
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { addUserInfo, removeUserInfo } from "./redux/slice/userSlice";

function App() {
  const { displayName } = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Firebase returns unsubscribe on onAuthStateChanged setup
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUserInfo({ uid, email, displayName }));
        console.log("signin", user);
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/"
        ) {
          navigate("/browse");
        }
      } else {
        console.log("signout");

        dispatch(removeUserInfo());
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="bg-[#141414]">
      <Header
        logoStyle={`${
          location.pathname === "/login"
            ? "w-44 h-20 absolute top-3 left-40 z-20"
            : "w-26 h-12 absolute top-2 left-12 z-20"
        } `}
      />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
