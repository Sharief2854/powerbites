import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ role, children }) {
  let token = localStorage.getItem("token");

  let decodeRole = jwtDecode(token);
  const navigate=useNavigate();

  useEffect(() => {
    if (decodeRole.role != role) {
      navigate("/login", { replace: true });
      localStorage.clearItem("token");
      return;
    }
  }, []);

  return children;
}