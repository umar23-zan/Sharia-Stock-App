import React, {useState, useEffect} from 'react';
import { getUserData } from '../api/auth';
import '../dashboard.css'; // Import the CSS file
import { useNavigate, Link } from 'react-router-dom';
import account from '../images/account-icon.svg';
import logout from '../images/logout.svg';
import logo from '../images/ShariaStocks-logo/logo.png'

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // For user profile dropdown
  
  const [user, setUser] = useState({});
  const navigate = useNavigate(); 
  
  const email = localStorage.getItem('userEmail'); 

  // Fetch user data on component mount
  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        const userData = await getUserData(email);
        setUser(userData);
      };
      fetchData();
    }
  }, [email]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="header-icons">
          <img src={logo} alt="logo" className="logo" onClick={() => navigate('/Dashboard')}/>
        </div>
        <div className="header-button">
          <button onClick={() => navigate('/portfolio')} className="portfolio">
            Portfolio
          </button>
          <button onClick={() => navigate('/watchlist')} className="watchlist">
            Watchlist
          </button>
        </div>
        <div className="user-icon" onClick={toggleDropdown}>
          <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" className="profile-pic" /> {/* Profile Picture */}
          <div className='user-info'>
          <p>{user.name}</p>
          </div>
          
        </div>
      </nav>

      {/* User profile dropdown */}
      {isDropdownOpen && (
        <div className="profile-dropdown">
          <div className='profile-section'>
          <div className='profile-info'>
          <p className='profile-username'><strong>{user.name}</strong></p>
          <p className='profile-email'>{user.email}</p>
          </div>
          </div>
          <div className='edit-profile-section'>
            <img src={account} alt="account" />
          <Link to="/editprofile"><strong>Profile</strong></Link>
          </div>
          
          <div className='logout-section'>
            <img src={logout} alt="logout" />
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default Header