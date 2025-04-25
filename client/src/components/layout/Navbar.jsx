import { LogOut, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import AuthStore from "../../zustandStore/useAuthStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { AuthUser, checkCurreentUser, LogOutUser } = AuthStore();
  const navigate = useNavigate();

  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const modalRef = useRef();

   useEffect(() => {
   
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDashboardModal(false);
      }
  
  }, []);

  useEffect(() => {
    checkCurreentUser();
  }, [checkCurreentUser]);

  const handleLogOut = () => {
    LogOutUser();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"
      >
        eventListing
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-800 font-semibold text-lg"
              : "text-lg text-gray-700 hover:text-blue-600"
          }
        >
          Home
        </NavLink>
        {
          AuthUser && <button
          onClick={() => setShowDashboardModal(!showDashboardModal)}
          className="text-lg text-gray-700 hover:text-blue-600 relative"
        >
          Dashboard {" "}...
        </button>
        }
        {showDashboardModal && (
          <div
            ref={modalRef}
            className="absolute top-full mt-2 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50 w-60 sm:w-64"
          >
            <div className="flex justify-end items-center">
              <button
                onClick={() => setShowDashboardModal(false)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/createEvent"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                >
                  ➕ Create Event
                </Link>
              </li>
              <li>
                <Link
                  to="/event-by-user"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                >
                  📋 My Events
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <Search size={23} className="animate-pulse" />
        </div>

        {AuthUser ? (
          <LogOut
            onClick={handleLogOut}
            size={20}
            className="hover:text-red-400 cursor-pointer transition"
          />
        ) : (
          <Link to="/signin">
            <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-800 font-semibold text-lg"
              : "text-lg text-gray-700 hover:text-blue-600"
          }
        >
          Home
        </NavLink>
        {
          AuthUser && <button
          onClick={() => setShowDashboardModal(!showDashboardModal)}
          className="text-lg text-gray-700 hover:text-blue-600 relative"
        >
          Dashboard
        </button>
        }

        {showDashboardModal && (
          <div
            ref={modalRef}
            className="absolute top-full mt-2 right-0 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50 w-60 sm:w-64"
          >
            <div className="flex justify-end items-center">
              <button
                onClick={() => setShowDashboardModal(false)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/createEvent"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                >
                  ➕ Create Event
                </Link>
              </li>
              <li>
                <Link
                  to="/event-by-user"
                  className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                >
                  📋 My Events
                </Link>
              </li>
            </ul>
          </div>
        )}

        {AuthUser ? (
          <LogOut
            onClick={handleLogOut}
            size={20}
            className="hover:text-red-400 cursor-pointer transition"
          />
        ) : (
          <Link to="/signin">
            <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
