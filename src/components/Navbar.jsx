import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm px-3">
      <span className="navbar-brand fw-bold" style={{ cursor: "pointer" }} onClick={() => navigate("/tasks")}>
        Todo App
      </span>

      <div className="ms-auto d-flex align-items-center gap-3">
        <span className="fw-semibold">{username}</span>
        <button className="btn btn-outline-primary" onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
