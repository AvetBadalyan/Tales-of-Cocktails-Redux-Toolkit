import React from "react";
import { Link } from "react-router-dom";
import ".//Header.css";
import logo from "./../../assets/cocktails-logo-neon-light.jpg";

export default function Navbar() {
  return (
    <nav className="nav-main">
      <div className="logo-and-title-container">
        <Link to="/" className="image-container">
          <img src={logo} alt="logo" />
        </Link>

        <div className="title-container">
          <h1>Tales of Cocktails</h1>
        </div>
      </div>

      <div className="nav-links">
        <div>
          <Link to="/" className="nav-links-item">
            Home
          </Link>
        </div>
        |
        <div>
          <Link to="/cocktails" className="nav-links-item">
            Cocktails
          </Link>
        </div>
        |
        <div>
          <Link to="/about" className="nav-links-item">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
