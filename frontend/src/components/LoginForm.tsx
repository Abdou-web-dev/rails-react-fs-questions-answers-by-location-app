import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {}
// Define Zod schema for email and password
const emailSchema = z.string().email("Invalid email format");

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
      // Validate email and password using Zod
      emailSchema.parse(email);
      // passwordSchema.parse(password);
      await login(email, password);
      navigate("/main-page");
      // If login is successful, you can perform additional actions
      // For example, you can redirect to another page
    } catch (error) {
      // Handle login failure, e.g., display an error message
      // console.error("Login failed:", error);
      // setError("Login failed. Please check your credentials.");
      if (error instanceof ZodError) {
        // Handle validation errors
        setError(error.errors[0].message);
      }
    }
  }

  return (
    <>
      {!userToken ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          <label className="block mb-2">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <br />
          <label className="block mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <br />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
          {/* Display error message */}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <Navigate to="/main-page" />
      )}
    </>
  );
};
