import React, { useState, useEffect }  from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Footer.css'


const Footer = () => {
  const location = useLocation(); // Get the current location
  const [getEmail, setgetEmail] = useState(location.state);
  const [email1, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNewsletterSignup = () => {

    // Add logic to handle newsletter signup (e.g., sending the email to your backend)
    if (email1) {
      alert(`Thank you for subscribing with the email: ${email1}`);
      setEmail(''); // Clear the input after submission
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const goToAbout = () => navigate('/aboutus');
  const goToLegal = () => navigate('/legal');
  const goToPrivacy = () => navigate('/privacypolicy');
  const goToContact = () => navigate('/contactus');

  return (
    
      <footer className="footer">
        <div className="footer-left">
          <div className="newsletter">
            <h4>Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              value={email1}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <button onClick={handleNewsletterSignup}>Subscribe</button>
            <p>&copy; 2024 ShariaStock. All rights reserved.</p>
          </div>
        </div>
        <div className="footer-center">
          <div className="company-info">
            <h4>ShariaStock</h4>
            <ul>
              <li onClick={() => navigate('/aboutus')}>About Us</li>
              <li onClick={() => navigate('/legal')}>Legal Information</li>
              <li onClick={() => navigate('/privacypolicy')}>Privacy Policy</li>
              <li onClick={() => navigate('/contactus')}>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <h4>Social Links</h4>
          <ul>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </footer>
    
  )
}

export default Footer