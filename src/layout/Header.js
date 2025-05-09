import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { LOGO_URL, USER_ICON } from "../utils/constants";
import SearchSuggestions from "./components/SearchSuggestions";

const Header = ({ logoStyle }) => {
  const { displayName } = useSelector((store) => store.user.userInfo);
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {});
  };

  return (
    <div className="fixed top-0 w-full h-36 bg-gradient-to-b from-black z-50 grid grid-cols-8 items-start">
      <div className="col-span-1">
        <img className={logoStyle} alt="logo" src={LOGO_URL}></img>
      </div>
      {window.location.pathname !== "/login" && (
        <>
          <div className="flex flex-row gap-5 text-sm pt-5 col-span-4">
            <nav
              className="text-white font-semibold"
              onClick={() => navigate("/browse")}
            >
              Home
            </nav>
            <nav className="text-white">TV Shows</nav>
            <nav className="text-white">Movies</nav>
            <nav className="text-white">New & Popular</nav>
            <nav className="text-white">My List</nav>
            <nav className="text-white">Browse by Languages</nav>
          </div>
          <div className="col-span-3 flex flex-row justify-around mt-4 align">
            <SearchSuggestions />
            <div className="flex gap-3">
              <img
                alt="user-icon"
                className="w-8 h-8 rounded-sm cursor-pointer"
                src={USER_ICON}
              ></img>
              <button
                className="text-white text-sm max-h-fit mt-1"
                onClick={handleSignout}
              >
                Sign out ({displayName})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
