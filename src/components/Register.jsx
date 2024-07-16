import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        pin,
        mobileNumber,
        email,
        role,
      });
      console.log(data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={registerHandler}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="5-digit PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="user">User</option>
        <option value="agent">Agent</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
