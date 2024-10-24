import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // For user profile dropdown
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar initially hidden

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="header-icons">
          {/* List icon to toggle sidebar */}
          <i className="fas fa-list" onClick={toggleSidebar}></i>
          <div className="logo">ShariaStock</div>
        </div>

        <div className="user-icon" onClick={toggleDropdown} >
          <i className="fas fa-user"></i>
        </div>
      </nav>

      {/* User profile dropdown */}
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <p>Name</p>
          <button className="premium-btn">Go Premium</button>
          <ul>
            <li>
              <Link to="/editprofile">Edit Profile</Link> {/* Use Link here */}
            </li>
            <li>
              <Link to="/settings">Settings</Link> {/* Use Link here */}
            </li>
          </ul>
          <button className="logout-btn">Logout</button>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar - only show if isSidebarOpen is true */}
        {isSidebarOpen && (
          <div className="sidebar">
            <ul className="sidebar-links">
              <li><i className="fas fa-tachometer-alt"></i> Dashboard</li>
              <li><i className="fas fa-eye"></i> Watchlist</li>
              <li><i className="fas fa-briefcase"></i> Portfolio</li>
            </ul>
            <div className="market-overview">
              <h4>Market Overview</h4>
              <p>NSE <span className="red">25,0625</span></p>
              <p>BSE <span className="green">25,0545</span></p>
            </div>
          </div>
        )}

        <div className="content-area">
          {/* Additional content can go here */}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <div className="newsletter">
            <h4>Newsletter</h4>
            <input type="email" placeholder="Your email" />
            <p>&copy; 2024 ShariaStock. All rights reserved.</p>
          </div>
        </div>
        <div className="footer-center">
          <div className="company-info">
            <h4>ShariaStock</h4>
            <ul>
              <li>About us</li>
              <li>Legal information</li>
              <li>Privacy policy</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <h4>Social Links</h4>
          <ul>
            <li><i className="fab fa-linkedin"></i> LinkedIn</li>
            <li><i className="fab fa-facebook"></i> Facebook</li>
            <li><i className="fab fa-instagram"></i> Instagram</li>
            <li><i className="fab fa-youtube"></i> YouTube</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
