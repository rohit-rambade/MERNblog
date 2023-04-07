import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex flex-wrap items-center font-Poppins justify-between px-4 py-3 bg-black shadow-sm shadow-slate-300">
      <div className="flex items-center">
        <Link to="/" className="font-Poppins text-white font-semibold text-lg">
          The Mouse and Keyboard
        </Link>
      </div>
      <button className="flex items-center px-3 py-2 text-white rounded md:hidden focus:outline-none focus:shadow-outline">
        <svg
          className="h-4 w-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" />
        </svg>
      </button>
      <nav className="flex flex-col md:flex-row md:items-center md:justify-center w-full md:w-auto hidden md:block">
        {username && (
          <>
            <Link
              to="/create"
              className="font-semibold text-md text-white py-2 px-4 border-b-2 border-transparent hover:border-white"
            >
              Create new post
            </Link>
            <a
              onClick={logout}
              className="font-semibold text-md text-white py-2 px-4 border-b-2 border-transparent hover:border-white"
            >
              Logout ({username})
            </a>
          </>
        )}
        {!username && (
          <>
            <Link
              to="/login"
              className="font-semibold text-md text-white py-2 px-4 border-b-2 border-transparent hover:border-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-semibold text-md text-white py-2 px-4 border-b-2 border-transparent hover:border-white"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
