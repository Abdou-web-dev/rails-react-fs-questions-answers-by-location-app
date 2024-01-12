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
    <div>
      {/* <span className="text-yellow-900 text-2xl italic border-l font-bold font-serif">
        {user.email}
      </span> */}
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
  );
};

export default App;
