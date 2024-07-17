import { AiOutlineBars } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";

const DashboardNav = ({ handleToggle }) => {
  const { user, setLoading, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access-token");

    setUser(null);
    localStorage.removeItem("user");
    setLoading(true);
    navigate("/");
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-10 w-full bg-slate-50 dark:bg-slate-700 border-b border-gray-200">
      {/* Small Screen Navbar */}
      <div className=" dark:bg-slate-700 text-gray-800 flex justify-between">
        {/* Humburger and Logo */}
        <div className="flex items-center md:hidden">
          <button
            onClick={handleToggle}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200">
            <AiOutlineBars className="h-5 w-5 dark:text-slate-300" />
          </button>
          <div className="block cursor-pointer font-bold">
            <Link to="/dashboard" className="text-xl font-bold">
              Fast Pay
            </Link>
          </div>
        </div>

        {/* Navbar */}
        <div className="flex-1 dark:bg-slate-700">
          <div className="navbar ">
            {/* Search Bar input field */}
            <div className="flex-1"></div>

            {/* Right Side */}
            <div className="flex-none space-x-4">
              {/* User Profile menu with Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center justify-start ">
                  <div className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="profile image"
                        src="https://i.ibb.co/Y2T7TS7/ava.png"
                      />
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-semibold dark:text-slate-300">
                      {user?.name}
                    </p>
                    <small className="text-xs dark:text-slate-300">
                      {user?.role}
                    </small>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-md dark:bg-slate-700 dark:text-slate-300 w-64">
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:bg-blue-100 rounded-md">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:bg-blue-100 rounded-md">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardNav.propTypes = {
  handleToggle: PropTypes.func,
  isActive: PropTypes.bool,
};

export default DashboardNav;
