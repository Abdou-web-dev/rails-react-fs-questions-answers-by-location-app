import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthGuardedComponent } from "./components/AuthGuardedComponent ";
import { LoginForm } from "./components/LoginForm";
import { NoMatch } from "./components/NoMatch";
import { RegistrationForm } from "./components/RegistrationForm";
import { UserType } from "./types/UserType";

const App: React.FunctionComponent = () => {
  // If the "user" item is present in localStorage, JSON.parse parses its value into the user object.
  // If the "user" item is not present, localStorage.getItem("user") returns null, and JSON.parse(null) results in null.
  let user: UserType = JSON.parse(localStorage.getItem("user") || "{}");

  console.log(user.email, "user email from App");
  // const userToken = localStorage.getItem("userToken");
  // If user.email is null or undefined (indicating that there was no "user" item in localStorage or it didn't have an email property), the background image is rendered.
  // If user.email is present (not null or undefined), meaning that there is a "user" item in localStorage with an email property, the background image is not rendered.
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* Left Section (BG Image) */}
      {!user.email ? (
        <div className="bg-cover bg-center h-screen w-3/4"></div>
      ) : null}
      {/* Right Section (Signup/Login Forms) */}
      <div className="bg-white p-8 w-1/4">
        {/* <h1 className="text-2xl font-semibold mb-6">Your Web App</h1> */}

        {/* Router for Signup and Login */}
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<RegistrationForm />} />
            {/* Protected Route */}
            <Route path="/main-page" element={<AuthGuardedComponent />} />
            <Route path="/*" element={<NoMatch />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
