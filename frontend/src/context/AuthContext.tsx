import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  userToken: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  // subscribeToAuthChanges: (callback: () => void) => void;
  isAuthenticated: boolean;
  loginError: string | null;
  setLoginError: React.Dispatch<React.SetStateAction<string | null>>;
  registerError: string | null;
  setRegisterError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  userToken: "",
  register: async () => {
    throw new Error("register function not yet implemented");
  },
  // subscribeToAuthChanges: () => {},
  isAuthenticated: false,
  loginError: "",
  setLoginError: () => {},
  registerError: "",
  setRegisterError: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [userToken, setUserToken] = useState<string>("");
  const storedToken = localStorage.getItem("userToken");
  // const [subscribers, setSubscribers] = useState<(() => void)[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Use null as initial loading state
  // It seems like the issue might be related to the initial state of the isAuthenticated variable in the AuthProvider. When the page is refreshed, the entire React application is re-rendered, and the state is reset to its initial values.
  // To address this issue, you can consider checking the localStorage for the user token during the initialization of the isAuthenticated state in your AuthProvider. If there's a token in the localStorage, set isAuthenticated to true. This way, even if the page is refreshed, the isAuthenticated state will be correctly initialized based on the stored token.
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/sign_in",
        {
          user: {
            email,
            password,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response);
      const { authentication_token: token } = response?.data?.user;
      // const { user, token } = response.data;
      localStorage.setItem("userToken", token);
      const { user } = response?.data;
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      // localStorage.setItem("user", JSON.stringify(user));
      setUserToken(token);
    } catch (error: any) {
      console.log(error);
      setLoginError("Login failed. Please check your credentials.");
      // Handle the error or set an error state if needed
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    // let user = JSON.parse("user");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserToken("");
  };

  const register = async (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response
      const { authentication_token: token } = response?.data?.user;
      const { user } = response?.data;
      console.log(user, "user from AuthContext");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userToken", token); // Use "userToken" key here
      setUserToken(token);
      setIsAuthenticated(true);
      // Redirect to MainPage or handle the successful creation in your way
    } catch (error: any) {
      // Handle registration failure, e.g., set an error state
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors;
        console.log(errorMessages, "errorMessages");
        // Handle the specific error messages (e.g., duplicate email)
        // Display error messages to the user
        setRegisterError(errorMessages[0] && errorMessages[0]);
      } else {
        // Handle other types of errors
        setRegisterError("Registration failed due to an issue with the server");
        console.log(
          "Registration failed due to an issue with the server:",
          error
        );
      }
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (storedToken) {
        // If a token exists in localStorage, set isAuthenticated to true
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [storedToken]);

  // In this modification, the isAuthenticated state is initially set to null, indicating that the authentication state is still loading. The children (your application) are only rendered when the isAuthenticated state is either true or false. This should help prevent the brief appearance of the background image during the initial rendering.
  // . When the page is refreshed, the entire React application is re-rendered, and the state is reset to its initial values. meaning isAuthenticated === null
  if (isAuthenticated === null) {
    // Still loading, don't render anything
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          userToken,
          login,
          logout,
          register,
          isAuthenticated,
          loginError,
          setLoginError,
          registerError,
          setRegisterError,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
};
// This ensures that the application won't render the children until the authentication state is determined, to either true or false, avoiding any unwanted UI glitches during the loading phase.

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
// *************
