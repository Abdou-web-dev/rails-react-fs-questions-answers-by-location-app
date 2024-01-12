import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

const emailSchema = z.string().email("Invalid email format");
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .refine(
    (password: string) => {
      // Check for at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter");
      }

      // Check for at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        throw new Error("Password must contain at least one lowercase letter");
      }

      // Check for at least one number
      if (!/\d/.test(password)) {
        throw new Error("Password must contain at least one number");
      }

      // Check for at least one special character
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error("Password must contain at least one special character");
      }
      return true;
    },
    {
      message: "Password does not meet the specified strength requirements",
    }
  );

export const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { register } = useAuth();
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [pwdEmpty, setPwdEmpty] = useState(false);
  const [pwdConfEmpty, setPwdConfEmpty] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    try {
      passwordSchema.parse(newPassword);
      setPasswordError(null);
    } catch (validationError: any) {
      // setPasswordError(validationError?.errors[0]?.message);
      // It seems like the validationError object is sometimes undefined, leading to the error you're encountering. To handle this situation, you can check if validationError exists before trying to access its properties
      setPasswordError(
        validationError?.errors?.[0]?.message || validationError?.message
      );
    }
  };

  // const FieldNames = {
  //   EMAIL: "email",
  //   PASSWORD: "pwd",
  //   PASSWORD_CONF: "pwdconf",
  // };

  // const handleBlur = (field: string) => {
  //   switch (field) {
  //     case FieldNames.EMAIL:
  //       setEmailEmpty(!!email); // Set to true if email is not empty
  //       break;
  //     case FieldNames.PASSWORD:
  //       setPwdEmpty(!!password);
  //       break;
  //     case FieldNames.PASSWORD_CONF:
  //       setPwdConfEmpty(!!passwordConfirmation);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) setEmailEmpty(true);
    else setEmailEmpty(false);
    if (!password) setPwdEmpty(true);
    else setPwdEmpty(false);
    if (!passwordConfirmation) setPwdConfEmpty(true);
    else setPwdConfEmpty(false);
    // Validate email and password confirmation on form submission
    let validationErrors = [];

    try {
      emailSchema.parse(email);
    } catch (emailValidationError: any) {
      validationErrors?.push(emailValidationError.errors[0].message);
    }

    // Password confirmation validation logic here
    if (passwordConfirmation !== password) {
      validationErrors?.push("Passwords do not match");
    }

    try {
      passwordSchema.parse(password);
    } catch (passwordValidationError: any) {
      validationErrors?.push(
        (password && passwordValidationError?.errors?.[0]?.message) ||
          (password && passwordValidationError?.message)
      );
    }

    if (validationErrors?.length > 0) {
      // If there are validation errors, set the state and prevent further execution
      setError(null);
      setPasswordError(null);
      validationErrors?.forEach((errMsg) => {
        if (errMsg.includes("Passwords do not match")) {
          setPasswordError(errMsg);
        } else {
          setError(errMsg);
        }
      });
      return;
    }

    // If no validation errors, proceed with registration
    await register(email, password, passwordConfirmation);
    if (userToken) {
      navigate("/main-page");
    }
  };

  return (
    <>
      {!userToken ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Registration</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label className="block mb-2">Email:</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              // className="block w-full mb-4 p-2 border border-gray-300 rounded"
              className={`block w-full mb-4 p-2 border border-gray-300 rounded ${
                emailEmpty ? "border-red-500" : "border-gray-300"
              }`}
              // onBlur={() => setEmailEmpty(!email.trim())} //his code checks if the trimmed email is empty (i.e., no non-whitespace characters), and if so, it sets emailEmpty to true, indicating that the email field is empty. If the trimmed email is not empty, it sets emailEmpty to false.
            />
            <br />
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`block w-full mb-4 p-2 border border-gray-300 rounded ${
                pwdEmpty ? "border-red-500" : "border-gray-300"
              }`}
              // onBlur={() => setEmailEmpty(!password.trim())}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <br />
            <label className="block mb-2">Confirm Password:</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={`block w-full mb-4 p-2 border border-gray-300 rounded ${
                pwdConfEmpty ? "border-red-500" : "border-gray-300"
              }`}
              // onBlur={() => setEmailEmpty(!passwordConfirmation.trim())}
            />
            <br />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <Navigate to="/main-page" />
      )}
    </>
  );
};
