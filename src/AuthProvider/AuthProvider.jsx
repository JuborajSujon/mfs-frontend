import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "./../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const newUser = localStorage.getItem("user");
    if (newUser) {
      setUser(JSON.parse(newUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axiosPublic.get(`/user/${user?.email}`);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      getCurrentUser();
    }
  }, [axiosPublic, user, reload]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    currentUser,
    reload,
    setReload,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
