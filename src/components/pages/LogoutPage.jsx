import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove items from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Set user state to null
    props.setUser(null);

    // Navigate to home
    navigate("/");
  }, [navigate, props]);

  return <div>Logging out...</div>; // Or you can leave this empty or customize it as needed
}
