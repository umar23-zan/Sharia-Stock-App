import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';  
import logo from '../images/ShariaStocks-logo/logo.png'
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData);
            setAlert({ type: 'success', message: 'Login successful!' });
            console.log(res);
            localStorage.setItem('userEmail', res.email);
            navigate('/Dashboard');  // Ensure route is defined
            setFormData({ email: '', password: '' });  // Clear form after success
        } catch (error) {
            setAlert({ type: 'error', message: 'Login failed. Please try again.' });
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <div className='header-section'>
                <img src={logo} alt="logo" />
            </div>
            <div className='form-container'>
                <h1>Login</h1>
                {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>} {/* Show alert */}
                <form onSubmit={onSubmit}>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} placeholder="Enter your Email" required />
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} placeholder="Enter your Password" required />
                    <p className='fglink'><Link to="/forgot-password">Forgot Password?</Link></p>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
