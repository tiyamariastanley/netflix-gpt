import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateEmailPassword } from "../utils/validateForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { BACKGROUND_IMG } from "../utils/constants";
import Footer from "./Footer";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorMsg = validateEmailPassword(
      emailRef.current.value,
      passRef.current.value
    );

    if (!errorMsg && !login) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      )
        .then((userCredential) => {
          // Signed up

          updateProfile(auth.currentUser, {
            displayName: nameRef.current.value,
          })
            .then(() => {})
            .catch((error) => {
              const errorMessage = error.message;
              setErrorMsg(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
          // ..
        });
    } else if (login) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("login user", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
        });
    } else {
      setErrorMsg(errorMsg);
    }
  };

  return (
    <div>
      <Header logoStyle={"w-44 h-20 absolute top-3 left-40 z-20"} />
      <div className="absolute">
        <img alt="background-image" src={BACKGROUND_IMG}></img>
      </div>
      <div className="z-10 relative mx-auto flex flex-col gap-7 p-16 justify-center items-start bg-black opacity-85 top-28 min-w-96 w-fit rounded-md">
        <h2 className="text-white text-3xl font-bold">
          {login ? "Sign In" : "Sign Up"}
        </h2>
        <form className="flex flex-col justify-center gap-5 w-full">
          {!login && (
            <input
              className="p-3 rounded-md bg-black border text-white"
              type="text"
              valu=""
              placeholder="Full name"
              required
              ref={nameRef}
            ></input>
          )}
          <input
            className="p-3 rounded-md bg-black border text-white"
            type="text"
            valu=""
            placeholder="Email address or mobile number"
            required
            ref={emailRef}
          ></input>
          <input
            className="p-3 rounded-md bg-black border text-white"
            type="password"
            valu=""
            placeholder="Password"
            required
            ref={passRef}
          ></input>
          {errorMsg && <p className="text-red-700 font-semibold">{errorMsg}</p>}
          <button
            className="bg-red-600 py-2 text-white rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
        <div>
          <div className="text-gray-400 grid grid-flow-col gap-2">
            {login ? "New to Netflix?" : "Already have an account?"}
            <div
              className="text-white cursor-pointer hover:underline"
              onClick={() => setLogin(!login)}
            >
              {login ? "Sign up now." : "Sign in now"}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
