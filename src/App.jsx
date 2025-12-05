import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import userServices from "./services/userServices";
import "./index.css";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await userServices.getProfile();
      setIsLogged(true);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("email", res.data.user.email);
    } catch  {
      setIsLogged(false);
      localStorage.clear();
    }
  };

  useEffect(() => {
    const start = async () => {
      await checkAuth();
      setChecking(false); 
    };

    start();
  }, []);

  // show loader while checking
  if (checking) {
    return <div className="center-screen">Checking authentication...</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogged ? <Navigate to="/tasks" /> : <Navigate to="/login" />,
    },

    {
      path: "/login",
      element: isLogged ? <Navigate to="/tasks" /> : <Login onLogin={checkAuth} />,
    },

    {
      path: "/register",
      element: isLogged ? <Navigate to="/tasks" /> : <Register />,
    },

    {
      path: "/tasks",
      element: isLogged ? (
        <>
          <Navbar />
          <Tasks />
        </>
      ) : (
        <Navigate to="/login" />
      ),
    },

    {
      path: "/profile",
      element: isLogged ? (
        <>
          <Navbar />
          <Profile onProfileChange={checkAuth} />
        </>
      ) : (
        <Navigate to="/login" />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
