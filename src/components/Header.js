import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, removeUserInfo } from "../redux/slice/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { LOGO_URL, USER_ICON } from "../utils/constants";

const Header = ({ logoStyle }) => {
  const { displayName } = useSelector((store) => store.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase returns unsubscribe on onAuthStateChanged setup
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { name, uid, email, displayName } = user;
        dispatch(addUserInfo({ name, uid, email, displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        console.log("signout");

        dispatch(removeUserInfo());
        navigate("/");
      }
    });

    //Called when header component is unmounted
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("logout");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="absolute top-0 w-full h-36 bg-gradient-to-b from-black z-10 grid grid-cols-8 items-start">
      <div className="col-span-1">
        <img className={logoStyle} alt="logo" src={LOGO_URL}></img>
      </div>
      {window.location.pathname === "/browse" && (
        <>
          <div className="flex flex-row gap-5 text-sm pt-5 col-span-6">
            <nav className="text-white font-semibold">Home</nav>
            <nav className="text-white">TV Shows</nav>
            <nav className="text-white">Movies</nav>
            <nav className="text-white">New & Popular</nav>
            <nav className="text-white">My List</nav>
            <nav className="text-white">Browse by Languages</nav>
          </div>
          <div className="col-span-1 text-end">
            <img
              alt="user-icon"
              className="absolute w-8 h-8 rounded-sm cursor-pointer top-4 right-32"
              src={USER_ICON}
            ></img>

            <button
              className="text-white mt-5 mr-8 text-sm"
              onClick={handleSignout}
            >
              Sign out ({displayName})
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
