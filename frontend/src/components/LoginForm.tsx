import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  // onLogin: (token: string) => void;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      // Call the login function with await
      await login(email, password);
      navigate("/main-page");

      // If login is successful, you can perform additional actions
      // For example, you can redirect to another page
    } catch (error) {
      // Handle login failure, e.g., display an error message
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <>
      {!userToken ? (
        <div>
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <Navigate to="/main-page" />
      )}
    </>
  );
};
