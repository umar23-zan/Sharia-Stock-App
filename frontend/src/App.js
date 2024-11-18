import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Design from './components/Design'
import Dashboard from './components/Dashboard';
import Portfolio from './components/portfolio';
import Watchlist from './components/watchlist';
import './portfolio.css'
import EditProfile from './components/editprofile';
import Settings from './components/Settings';
import  StockDetail  from './components/StockDetail';
import AboutUs from './components/AboutUs';
import Legal from './components/Legal';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

    const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const addToPortfolio = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const addToWatchlist = (stock) => {
    setWatchlist((prev) => [...prev, stock]);
  };

  const userId = localStorage.getItem('userId');

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Design />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard addToPortfolio={addToPortfolio} addToWatchlist={addToWatchlist} userId={userId} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/portfolio"
                    element={
                        <PrivateRoute>
                            <Portfolio portfolio={portfolio} userId={userId} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/watchlist"
                    element={
                        <PrivateRoute>
                            <Watchlist watchlist={watchlist} userId={userId} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/editprofile"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/stock/:symbol"
                    element={
                        <PrivateRoute>
                            <StockDetail />
                        </PrivateRoute>
                    }
                />

                    <Route path="/legal" element={<Legal />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
