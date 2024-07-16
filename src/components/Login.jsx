import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/login", {
        mobileNumber,
        email,
        pin,
      });
      localStorage.setItem("authToken", data.token);
      console.log(data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
