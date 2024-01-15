import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { useAuth } from "../context/AuthContext";
import { emailSchema } from "./RegistrationForm";
// it's common to focus on verifying the correctness of the entered credentials during login and handle password strength checks separately during registration or password change workflows.
// In many cases, password strength checks are done during registration, and during login, the focus is on verifying the entered credentials against the stored ones. It's a good practice to balance security requirements with a user-friendly experience.
interface LoginFormProps {}

export const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state variable
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [pwdEmpty, setPwdEmpty] = useState(false);

  const { login, loginError, setLoginError } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const validationResult = emailSchema.safeParse(newEmail);
    if (validationResult.success === true) {
      setLoginError(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailEmpty(!email.trim());
    setPwdEmpty(!password.trim());
    setLoginError(null); // Reset error state

    try {
      setIsLoggingIn(true);
      emailSchema.parse(email);
      // Perform the login
      await login(email, password);

      // Navigate on successful login
      if (userToken) {
        navigate("/main-page");
      }

      // This code checks whether the userToken variable has a truthy value. In many authentication systems, a user token is assigned to a user upon successful login. If userToken has a value (i.e., it's truthy), it means that the user is logged in. In this case, the code uses the navigate function to redirect the user to the "/main-page".
    } catch (error) {
      if (error instanceof ZodError) {
        setLoginError(error.errors[0].message);
      }
    } finally {
      // Finally Block: This block is executed regardless of whether there was an error or not.
      setIsLoggingIn(false);
    }
    // const validationResult = emailSchema.safeParse(password);
    // if (validationResult.success === true) {
    //   setError(null);
    // }
  };

  return (
    <>
      {!userToken ? (
        <div>
          <form onSubmit={handleLogin}>
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <label className="block mb-2">Email:</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`block w-full mb-2 p-2 border border-gray-300 rounded ${
                emailEmpty ? "border-red-500" : "border-gray-300"
              }`}
              onBlur={() => setEmailEmpty(!email.trim())}
            />
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              className={`block w-full mb-2 p-2 border border-gray-300 rounded ${
                pwdEmpty ? "border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPwdEmpty(!password.trim())}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              // onClick={handleLogin}
              disabled={isLoggingIn} // Disable the button during login attempt
              type="submit"
            >
              {/* Login */}
              {isLoggingIn ? "Logging In..." : "Login"}
            </button>
            {loginError && (
              <p className="text-red-600 field-error font-lato">{loginError}</p>
            )}
          </form>
        </div>
      ) : (
        <Navigate to="/main-page" />
      )}
    </>
  );
};
