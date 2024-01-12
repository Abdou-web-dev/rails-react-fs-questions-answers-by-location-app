import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthGuardedComponent } from "./components/AuthGuardedComponent ";
import { LoginForm } from "./components/LoginForm";
import { NoMatch } from "./components/NoMatch";
import { RegistrationForm } from "./components/RegistrationForm";
import { UserType } from "./types/UserType";

const App: React.FunctionComponent = () => {
  let user: UserType = JSON.parse(localStorage.getItem("user") || "");

  console.log(user.email, "user email from App");
  //
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* Left Section (BG Image) */}
      <div
        // style={{ width: "70%" }}
        className="bg-cover bg-center h-screen w-3/4 hey"
        // style={{ backgroundImage: "url('../')" }}
      ></div>

      {/* Right Section (Signup/Login Forms) */}
      <div
        className="bg-white p-8 w-1/4"
        // style={{ width: "30%" }}
        id="efheflhefliheflieh"
      >
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
