import { GrLogout } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import PropTypes from "prop-types";
import { FaRegUser, FaList, FaUserEdit, FaMoneyCheck } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { IoCashOutline } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const Sidebar = ({ handleToggle, isActive }) => {
  const { user, setLoading, setUser } = useAuth();
  const navigate = useNavigate();

  // TODO:Logout Handler

  const handleLogout = () => {
    localStorage.removeItem("access-token");

    setUser(null);
    localStorage.removeItem("user");

    setLoading(true);
    navigate("/");
  };

  return (
    <>
      {/* Sidebar */}

      <div
        className={`md:flex flex-col justify-between overflow-x-hidden border-r border-gray-200 bg-slate-200 dark:bg-slate-800  space-y-6 px-2 py-3 z-20 min-h-screen w-64 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } transform md:translate-x-0 md:static fixed top-0 left-0 h-full transition-transform duration-200 ease-in-out`}>
        <div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <div className="md:flex md:w-full px-4 py-2  justify-start items-center ">
              <Link to="/dashboard" className="text-xl font-bold">
                Fast Pay
              </Link>
            </div>
            <button
              onClick={handleToggle}
              className="btn btn-circle btn-sm md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1">
            {/*  Menu Items */}
            {user?.role === "admin" && user?.status === "active" && (
              <>
                <nav>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaRegUser className="w-5 h-5" />

                    <span className="mx-4 font-medium">User Profile</span>
                  </NavLink>

                  <NavLink
                    to="user-manage"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaUserEdit className="w-5 h-5" />

                    <span className="mx-4 font-medium">User Manage</span>
                  </NavLink>

                  <NavLink
                    to="transactions"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaList className="w-5 h-5" />

                    <span className="mx-4 font-medium">Transactions</span>
                  </NavLink>
                </nav>
              </>
            )}

            {user?.role === "user" && user?.status === "active" && (
              <>
                <nav>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaRegUser className="w-5 h-5" />

                    <span className="mx-4 font-medium">User Profile</span>
                  </NavLink>

                  <NavLink
                    to="balance"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaMoneyCheck className="w-5 h-5" />

                    <span className="mx-4 font-medium">Balance Inquiry</span>
                  </NavLink>

                  <NavLink
                    to="send-money"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <MdSendToMobile className="w-5 h-5" />

                    <span className="mx-4 font-medium">Send Money</span>
                  </NavLink>

                  <NavLink
                    to="cash-out"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <IoCashOutline className="w-5 h-5" />

                    <span className="mx-4 font-medium">Cash Out</span>
                  </NavLink>

                  <NavLink
                    to="cash-in"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaMoneyCheckDollar className="w-5 h-5" />

                    <span className="mx-4 font-medium">Cash In</span>
                  </NavLink>

                  <NavLink
                    to="transactions"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaList className="w-5 h-5" />

                    <span className="mx-4 font-medium">Transactions</span>
                  </NavLink>
                </nav>
              </>
            )}

            {user?.role === "agent" && user?.status === "active" && (
              <>
                <nav>
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaRegUser className="w-5 h-5" />

                    <span className="mx-4 font-medium">User Profile</span>
                  </NavLink>

                  <NavLink
                    to="balance"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaMoneyCheck className="w-5 h-5" />

                    <span className="mx-4 font-medium">Balance Inquiry</span>
                  </NavLink>

                  <NavLink
                    to="transactions"
                    end
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-2 transition-colors duration-300 transform hover:bg-blue-100 rounded-md hover:text-gray-700  dark:text-slate-300 ${
                        isActive
                          ? "border-l-8 bg-blue-100 border-l-blue-400 dark:text-slate-700 rounded-md"
                          : "text-gray-700"
                      }`
                    }>
                    <FaList className="w-5 h-5" />

                    <span className="mx-4 font-medium">Transactions</span>
                  </NavLink>
                </nav>
              </>
            )}
          </div>
        </div>

        <div className="">
          <hr className="border-blue-300 border-2" />

          {/* Profile Menu */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-orange-100 rounded-md hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5 dark:text-slate-300" />

            <span className="mx-4 dark:text-slate-300 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  handleToggle: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Sidebar;
