import React, { useState } from 'react';
import './NavBar.css';
// import { FaBars, FaTimes } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';


const Navbar = ({ toggleSignUpForm, toggleSigninForm }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  return (
      <nav className="navbar">
        <div className="logo">
        <NavLink to="/"><a href="/" ><img className="logo" src="./images/logo.png" alt="" width={150}/></a></NavLink>
        </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                  <a href="/" className="nav-links" >
                      Home
                  </a>
              </li>
              <li className="nav-item">
                  <a href="#features" className="nav-links" onClick={closeMenu}>
                      Features
                  </a>
              </li>
              <li className="nav-item">
                  <a href="#pricing" className="nav-links" onClick={closeMenu}>
                      Pricing
                  </a>
              </li>
              <li className="nav-item">
                  <a href="#testimonials" className="nav-links" onClick={closeMenu}>
                      Testimonials
                  </a>
              </li>
              <li className="nav-item">
                  <a href="#contact" className="nav-links" onClick={closeMenu}>
                      Contact
                  </a>
              </li>
          </ul>

          <div className="navbar-cta-buttons">
              <a href="/login" className="login-btn">
                  Login
              </a>
              <a
                  href="/register"
                  className="signup-btn"
                  >
                  Sign Up
              </a>
          </div>
      </nav>
  );
};

export default Navbar;
