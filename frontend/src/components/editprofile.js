import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../editprofile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from route parameters
  console.log(userId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
    city: '',
    state: '',
    password: '',
  });

  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/100');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/edit-profile/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data); // Populate form with existing data
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};

    // First Name and Last Name validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    // Contact number validation
    const contactRegex = /^[0-9]{10}$/;
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (!contactRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number must be exactly 10 digits';
    }

    // City and State validation
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters, include letters and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }

    try {
      const response = await fetch(`http://localhost:5000/api/edit-profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        navigate('/'); // Navigate back to profile page or wherever you want
      } else {
        alert('Failed to update profile: ' + result.message);
      }
    } catch (error) {
      alert('An error occurred');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigate back to the Profile page
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <h2>Edit Profile</h2>
        <div className="profile-picture">
          <img 
            src={profilePic} 
            alt="Profile" 
            className="profile-pic" 
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input 
            type="file" 
            id="fileInput" 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleImageChange}
          />
        </div>
      </div>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input 
              type="text" 
              name="firstName" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input 
            type="text" 
            name="address" 
            placeholder="Address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input 
            type="tel" 
            name="contactNumber" 
            placeholder="Contact Number" 
            value={formData.contactNumber} 
            onChange={handleChange} 
            required 
          />
          {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              name="city" 
              placeholder="City" 
              value={formData.city} 
              onChange={handleChange} 
              required 
            />
            {errors.city && <span className="error">{errors.city}</span>}
          </div>
          <div className="form-group">
            <label>State</label>
            <input 
              type="text" 
              name="state" 
              placeholder="State" 
              value={formData.state} 
              onChange={handleChange} 
              required 
            />
            {errors.state && <span className="error">{errors.state}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
