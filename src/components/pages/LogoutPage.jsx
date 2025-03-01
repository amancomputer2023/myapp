import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPage(props) {
  const navigate = useNavigate();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  props.setUser(null);  
  navigate("/");
  return <div></div>;
}
