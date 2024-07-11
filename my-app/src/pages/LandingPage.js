import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <h2>Welcome to Our Site</h2>
      <div className="button-container">
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link to="/registration">
          <button className="btn btn-secondary">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
