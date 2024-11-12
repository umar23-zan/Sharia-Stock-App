import React, { useEffect }   from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate,Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import signup from '../images/Signup.png';
import investing from '../images/Halal investing.png';
import opportunities from '../images/opportunities.png';
import halalway from '../images/Halal way.png';
import portfolio from '../images/Portfolio.png';
import infosys from '../images/infosys-logo.jpg';
import bajaj from '../images/Bajaj-logo.jpg';
import sbi from '../images/sbi-logo.jpg';
import hcl from '../images/hcl_technologies-logo.png';
import axis from '../images/Axis-logo.jpg';
import asian from '../images/asian-paints-logo.png';
import logo from '../images/ShariaStocks-logo/logo.png'
import '../design.css'

export default function Design() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userEmail')) {
      // Redirect to dashboard if already logged in
      navigate('/Dashboard');
    }
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const stocks = {
    mostActive: [
      { name: 'Infosys Ltd', symbol: 'INFY', price: '$145.26', compliance: 4, logo: `${infosys}` },
      { name: 'Bajaj Finance Ltd', symbol: 'BAJFINANCE', price: '$1.04', compliance: 3, logo: `${bajaj}` },
      { name: 'State Bank of India', symbol: 'SBIN', price: '$350.00',  compliance: 4, logo: `${sbi}` }
    ],
    mostPopular: [
      { name: 'HCL Technologies Ltd', symbol: 'HCLTECH', price: '$224.23', compliance: 1, logo: `${hcl}` },
      { name: 'Axis Bank Ltd', symbol: 'AXISBANK', price: '$145.26', compliance: 3, logo: `${axis}` },
      { name: 'Asian Paints Ltd', symbol: 'ASIANPAINT', price: '$350.00',  compliance: 3, logo: `${asian}` }
    ]
  };


    const renderCompliance = (rating) => {
      const stars = Array(5).fill('☆').fill('★', 0, rating);
      return <span className="compliance-rating">{stars.join('')}</span>;
    };

    const renderStockRow = (stock) => (
      <div className="stock-row" key={stock.symbol}>
        <div className="stock-name">
          <img src={stock.logo} alt={`${stock.name} logo`} className="stock-logo" />
          <div>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong>{stock.name}</strong>
          </Link>
            <p>{stock.symbol}</p>
          </div>
        </div>
        <div className="stock-price">
          <p>{stock.price}</p>
        </div>
        <div className="stock-compliance">
          <span className="compliance-badge">Halal</span>
          {renderCompliance(stock.compliance)}
        </div>
      </div>
    );
  

  return (
    <div>
      <div className='header'>
      <img src={logo} alt="logo" className='header-title'/>
        <div className='header-button'>
          <button className='login' onClick={handleLoginClick}>LOGIN</button>
          <button className='signup' onClick={handleSignupClick}>SIGNUP</button>
        </div>
      </div>
      <br />

      <div className='carousel-container'>
        <Carousel
          showArrows={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          transitionTime={1000}
          showStatus={false}
        >
          <div>
            <img src={signup} alt="Sign Up" />
          </div>
          <div>
            <img src={investing} alt="Investing" />
          </div>
          <div>
            <img src={opportunities} alt="Opportunities" />
          </div>
          <div>
            <img src={halalway} alt="Halal Way" />
          </div>
          <div>
            <img src={portfolio} alt="Portfolio" />
          </div>
        </Carousel>
      </div>

      <div className="trending-stocks">
      <h2>Trending Halal Stocks</h2>
      <div className="stocks-section">
        <div className="stocks-category">
          <h3>Most Active</h3>  

          <div className="table-headings">
            <span className="heading-name">Name</span>
            <span className="heading-price">Price</span>
            <span className="heading-compliance">Compliance</span>
          </div>  

          <div className="stocks-list">
            {stocks.mostActive.map(renderStockRow)}
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="upgrade-lock">🔒 Sign-up or Upgrade to Unlock!</div>
            </Link>
          </div>
        </div>
        <div className="stocks-category">
          <h3>Most Popular</h3>

          <div className="table-headings">
            <span className="heading-name">Name</span>
            <span className="heading-price">Price</span>
            <span className="heading-compliance">Compliance</span>
          </div>

          <div className="stocks-list">
            {stocks.mostPopular.map(renderStockRow)}
            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="upgrade-lock">🔒 Sign-up or Upgrade to Unlock!</div>
            </Link>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}
