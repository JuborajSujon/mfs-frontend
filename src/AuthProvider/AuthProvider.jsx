import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newUser = localStorage.getItem("user");
    if (newUser) {
      setUser(JSON.parse(newUser));
    }
    setLoading(false);
  }, []);

  const authInfo = { user, setUser, loading, setLoading };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
