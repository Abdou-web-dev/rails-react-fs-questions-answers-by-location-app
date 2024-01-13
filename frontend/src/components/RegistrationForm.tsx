import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import "./styles.css";

const emailSchema = z.string().email("Invalid email");
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
    const newEmail = e.target.value;
    setEmail(newEmail);

    const validationResult = emailSchema.safeParse(newEmail);
    if (validationResult.success === true) {
      setError(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // The try-catch block is used here for error handling. The try block contains the code that might throw an error, and the catch block specifies what to do if an error occurs within the try block.
    // In this specific case, the passwordSchema.parse(password) line is potentially risky because it may throw an error if the password doesn't meet the specified criteria. The try-catch block allows you to handle this potential error gracefully.
    // If there's an error during the parsing of the password (for example, if it doesn't meet the specified requirements), the catch block will be executed, and you can take appropriate actions, such as setting an error message or performing some other logic. If there's no error, the catch block is skipped, and the code after the try-catch continues to execute.
    // So, it's a way to ensure that the validation process doesn't cause the entire application to crash if there's an unexpected issue during password validation. It provides a mechanism to handle errors and provide a more user-friendly experience.
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset state
    setEmailEmpty(!email.trim());
    setPwdEmpty(!password.trim());
    setPwdConfEmpty(!passwordConfirmation.trim());
    setError(null);
    setPasswordError(null);
    // Validate email and password confirmation on form submission

    try {
      emailSchema.parse(email);
      // In the context of Zod and many other programming contexts, "parse" refers to the process of analyzing a string or data to determine its structure and extract meaningful information from it. Specifically, in Zod, the parse method is used to validate and transform data according to a specified schema.
      // In Zod, the parse method is used to validate and parse a value according to the specified schema. When you call passwordSchema.parse(newPassword), it checks if newPassword conforms to the rules defined in your passwordSchema. If the value (newPassword in this case) satisfies the schema, the parse method returns the parsed value. If the value does not meet the schema requirements, it throws an error.
    } catch (emailValidationError: any) {
      // showing the error message only when the email field is non-empty.
      if (email.trim()) setError(emailValidationError.errors[0].message);
    }

    // Password confirmation validation logic here
    if (passwordConfirmation !== password) {
      setPasswordError("Passwords do not match");
      // if the confirmation password doesn't match the original password,  push an error indicating that the passwords do not match.
    }

    // Here, it attempts to parse the password using the passwordSchema. If successful, it means the password is valid according to the defined schema. If parsing fails (i.e., the password doesn't meet the schema requirements), it catches the error (passwordValidationError) and sets passwordError state with the error message. The condition if (password.trim()) ensures that the error is set only if there's an actual password input (i.e., not empty).
    // The passwordValidationError?.errors?.[0]?.message part is a way of accessing the error message if it's structured that way. The ?. is the optional chaining operator, which means if any part of the chain is null or undefined, the entire expression will be short-circuited with a return value of undefined.
    try {
      passwordSchema.parse(password);
    } catch (passwordValidationError: any) {
      if (password.trim())
        setPasswordError(
          passwordValidationError?.errors?.[0]?.message ||
            passwordValidationError?.message
        );
    }

    // If there are validation errors, return early
    // In this part, it checks if either error or passwordError is truthy. If either of them has a value (meaning there's an error), it returns from the function, effectively stopping further execution. This is often used to prevent the form from being submitted or additional processing if there are validation errors.
    // The return statement stops the execution of the current function immediately.
    // In the context of a form submission, this is a common pattern to prevent further processing or the actual submission of the form if there are validation errors. It allows you to handle the errors and provide feedback to the user without proceeding with any actions that should only happen when the form is valid.
    if (error || passwordError) {
      return;
    }

    // If no validation errors, proceed with registration
    await register(email, password, passwordConfirmation);
    // After successful registration

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

            <label className="block mb-2">Email:</label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`block w-full mb-2 p-2 border border-gray-300 rounded ${
                emailEmpty ? "border-red-500" : "border-gray-300"
              }
              ${
                email
                  ? emailSchema.safeParse(email).success === true // It will dynamically change the border color based on the validation status of the email.
                    ? "border-green-500"
                    : "border-red-500"
                  : ""
              }
              `}
              onBlur={() => setEmailEmpty(!email.trim())} //this code checks if the trimmed email is empty (i.e., no non-whitespace characters), and if so, it sets emailEmpty to true, indicating that the email field is empty. If the trimmed email is not empty, it sets emailEmpty to false.
            />
            {error && (
              <p className="text-red-600 field-error font-lato">{error}</p>
            )}
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`block w-full mb-2 p-2 border border-gray-300 rounded ${
                pwdEmpty ? "border-red-500" : "border-gray-300"
              }`}
              onBlur={() => setPwdEmpty(!password.trim())}
            />
            {passwordError && (
              <p className="text-red-600 field-error font-lato">
                {passwordError}
              </p>
            )}

            <label className="block mb-2">Confirm Password:</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className={`block w-full mb-4 p-2 border border-gray-300 rounded ${
                pwdConfEmpty ? "border-red-500" : "border-gray-300"
              }`}
              onBlur={() => setPwdConfEmpty(!passwordConfirmation.trim())}
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
