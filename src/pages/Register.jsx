import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await userServices.register(username, email, password);
      setMessage(res.data.message);

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Create Account</h3>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input className="form-control mb-3" required value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Email</label>
          <input className="form-control mb-3" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input className="form-control mb-3" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;


