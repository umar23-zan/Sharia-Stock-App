import React, { useState, useEffect } from 'react';
import { getUserData, updateUserData } from '../api/auth';

const EditProfile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        address: {
            doorNumber: '',
            streetName: '',
            city: '',
            country: '',
            pincode: ''
        }
    });

    // Get email from local storage
    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchUserData = async () => {
            if (email) {
                try {
                    const userData = await getUserData(email);
                    setUser(userData);
                    setFormData({
                        name: userData.name || '',
                        contactNumber: userData.contactNumber || '',
                        address: userData.address || {
                            doorNumber: '',
                            streetName: '',
                            city: '',
                            country: '',
                            pincode: ''
                        }
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };
        fetchUserData();
    }, [email]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.address) {
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserData(email, formData);
            setIsEditing(false);
            // Optionally, re-fetch the user data to reflect updates
            const updatedUserData = await getUserData(email);
            setUser(updatedUserData);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleEditClick}>Edit</button>
            {isEditing && (
                <form onSubmit={handleSubmit}>
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
                        value={formData.address.doorNumber}
                        onChange={handleChange}
                        placeholder="Door Number"
                    />
                    <input
                        type="text"
                        name="streetName"
                        value={formData.address.streetName}
                        onChange={handleChange}
                        placeholder="Street Name"
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.address.country}
                        onChange={handleChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        name="pincode"
                        value={formData.address.pincode}
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
