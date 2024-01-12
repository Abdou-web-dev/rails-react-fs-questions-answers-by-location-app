import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// interface RegistrationFormProps {
//   onRegistration: (token: string) => void;
// }
export const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();

  const handleRegistration = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    await register(email, password, passwordConfirmation);
    navigate("/main-page");
    // Clear form fields after successful registration
    // resetFields();

    // Show a success message to the user
    // message.success("Registration successful!");
    // test;
  };

  return (
    <>
      {!userToken ? (
        <div>
          <h2>Registration</h2>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <br />
          <button onClick={handleRegistration}>Register</button>
        </div>
      ) : (
        <Navigate to="/main-page" />
      )}
    </>
  );
};
