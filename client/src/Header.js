import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
              onClick={() => setIsPopupOpen(true)}
              className="font-semibold text-md text-white py-2 px-4 border-b-2 cursor-pointer border-transparent hover:border-white"
            >
              Logout ({username})
            </a>
            {isPopupOpen && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          Logout
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm leading-5 text-gray-500">
                            Are you sure you want to logout?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <span className="flex w-full rounded-md shadow-sm">
                        <button
                          onClick={() => setIsPopupOpen(false)}
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-300 text-base leading-6 font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setIsPopupOpen(false);
                            logout();
                          }}
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        >
                          Logout
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
