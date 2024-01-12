import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  userToken: string;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  userToken: "",
  register: async () => {
    throw new Error("register function not yet implemented");
  },
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}) => {
  const [userToken, setUserToken] = useState<string>("");
  const storedToken = localStorage.getItem("userToken");

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

      // localStorage.setItem("user", JSON.stringify(user));
      setUserToken(token);
    } catch (error: any) {
      console.log(error);
      // Handle the error or set an error state if needed
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
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

      // Redirect to MainPage or handle the successful creation in your way
    } catch (error) {
      // Handle registration failure, e.g., set an error state
      console.log("Registration failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
