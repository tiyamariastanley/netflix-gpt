import {
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
        const { name, uid, email, displayName } = user;
        dispatch(addUserInfo({ name, uid, email, displayName }));
        console.log("signin");
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/"
        ) {
          navigate("/browse");
        }
      } else {
        // User is signed out
        console.log("signout");

        dispatch(removeUserInfo());
        if (window.location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    //Called when header component is unmounted
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
      <Outlet /> {/* Render the matched route here */}
      <Footer />
    </div>
  );
}

export default App;
