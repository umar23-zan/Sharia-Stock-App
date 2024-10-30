import React, { useState, useEffect } from 'react';
import { getUserData, updateUserData, uploadProfilePicture } from '../api/auth';

const EditProfile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        doorNumber: '',
        streetName: '',
        city: '',
        country: '',
        pincode: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    // Get email from local storage
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchUserData = async () => {
            if (email) {
                const userData = await getUserData(email);
                setUser(userData);
                setFormData({
                    name: userData.name,
                    contactNumber: userData.contactNumber || '',
                    doorNumber: userData.doorNumber || '',
                    streetName: userData.streetName || '',
                    city: userData.city || '',
                    country: userData.country || '',
                    pincode: userData.pincode || ''
                });
                setProfilePicture(userData.profilePicture || '');
            }
        };
        fetchUserData();
    }, [email]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => setProfilePicture(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserData(email, formData);
        if (profilePicture) {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append('email', email);
            await uploadProfilePicture(formData);
        }
        setIsEditing(false);
        const updatedUserData = await getUserData(email); // Refresh data after save
        setUser(updatedUserData);
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" width={100} height={100} />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Contact Number: {user.contactNumber}</p>
            <p>Address:</p>
            <p>{user.doorNumber}, {user.streetName}</p>
            <p>{user.city}, {user.country} - {user.pincode}</p>
            <button onClick={handleEditClick}>Edit</button>
            {isEditing && (
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Contact Number"
                    />
                    <h3>Address</h3>
                    <input
                        type="text"
                        name="doorNumber"
                        value={formData.doorNumber}
                        onChange={handleChange}
                        placeholder="Door Number"
                    />
                    <input
                        type="text"
                        name="streetName"
                        value={formData.streetName}
                        onChange={handleChange}
                        placeholder="Street Name"
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                    />
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default EditProfile;
