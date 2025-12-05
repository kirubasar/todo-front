import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";

const Profile = ({ onProfileChange }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userServices.getProfile().then((res) => {
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
    });
  }, []);

  const handleSave = async (e) => {
  e.preventDefault();
  try {
    await userServices.updateProfile({ username, email });

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    if (onProfileChange) {
      await onProfileChange();   
    }

    setMessage("Profile updated");
  } catch {
    setMessage("Failed to update profile");
  }
};


  const handleLogout = async () => {
  try {
    await userServices.logout();
  } catch {}

  localStorage.clear();

  
  if (onProfileChange) {
    await onProfileChange();
  }

  navigate("/login");
};

  const handleDelete = async () => {
  try {
    await userServices.deleteProfile();
  } catch {}

  localStorage.clear();

  if (onProfileChange) {
    await onProfileChange();   
  }

  navigate("/login");  // go to login after delete
};


  return (
  <div className="container mt-4" style={{ maxWidth: "480px" }}>
    <div className="card shadow-sm p-4 rounded-4">
      <h3 className="mb-3 fw-semibold">Profile</h3>

      {message && (
        <div
          className={`alert ${
            message.includes("Failed") ? "alert-danger" : "alert-success"
          } py-2`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        <label className="fw-semibold">Username</label>
        <input
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="fw-semibold">Email</label>
        <input
          className="form-control mb-3"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

    </form>

      <div className="d-flex gap-2 justify-content-center mt-3 flex-wrap">

     <button
        className="btn btn-primary btn-sm px-3"
        onClick={handleSave}
     >
        Save
    </button>

    <button
       className="btn btn-secondary btn-sm px-3"
       onClick={() => navigate("/tasks")}
    >
       Back
    </button>

    <button
       className="btn btn-danger btn-sm px-3"
       onClick={handleLogout}
    >
       Logout
    </button>

    <button
       className="btn btn-outline-danger btn-sm px-3"
       onClick={handleDelete}
    >
       Delete
    </button>

   </div>
   </div>
  </div>
);

};

export default Profile;


