import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getUserData } from '../api/auth';


const Dashboard = ({ addToPortfolio, addToWatchlist }) => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState({});
  const [isAddedToPortfolio, setIsAddedToPortfolio] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);


  const navigate = useNavigate(); // Initialize useNavigate
  const email = localStorage.getItem('userEmail');

  const companies = [
    { symbol: "RELIANCE.NSE", name: "Reliance Industries Ltd" },
    { symbol: "TCS.NSE", name: "Tata Consultancy Services Ltd" },
    { symbol: "INFY.NSE", name: "Infosys Ltd" },
    { symbol: "HDFCBANK.NSE", name: "HDFC Bank Ltd" },
    { symbol: "ICICIBANK.NSE", name: "ICICI Bank Ltd" },
    { symbol: "HINDUNILVR.NSE", name: "Hindustan Unilever Ltd" },
    { symbol: "BAJFINANCE.NSE", name: "Bajaj Finance Ltd" },
    { symbol: "KOTAKBANK.NSE", name: "Kotak Mahindra Bank Ltd" },
    { symbol: "LT.NSE", name: "Larsen & Toubro Ltd" },
    { symbol: "HCLTECH.NSE", name: "HCL Technologies Ltd" },
    { symbol: "SBIN.NSE", name: "State Bank of India" },
    { symbol: "ASIANPAINT.NSE", name: "Asian Paints Ltd" },
    { symbol: "ITC.NSE", name: "ITC Ltd" },
    { symbol: "BHARTIARTL.NSE", name: "Bharti Airtel Ltd" },
    { symbol: "AXISBANK.NSE", name: "Axis Bank Ltd" },
    { symbol: "MARUTI.NSE", name: "Maruti Suzuki India Ltd" },
    { symbol: "WIPRO.NSE", name: "Wipro Ltd" },
    { symbol: "ULTRACEMCO.NSE", name: "UltraTech Cement Ltd" },
    { symbol: "ONGC.NSE", name: "Oil & Natural Gas Corporation Ltd" },
    { symbol: "TITAN.NSE", name: "Titan Company Ltd" },
    { symbol: "DRREDDY.NSE", name: "Dr. Reddy's Laboratories Ltd" },
    { symbol: "ADANIENT.NSE", name: "Adani Enterprises Ltd" },
    { symbol: "SUNPHARMA.NSE", name: "Sun Pharmaceutical Industries Ltd" },
    { symbol: "POWERGRID.NSE", name: "Power Grid Corporation of India Ltd" },
    { symbol: "M&M.NSE", name: "Mahindra & Mahindra Ltd" },
    { symbol: "NTPC.NSE", name: "NTPC Ltd" },
    { symbol: "TATASTEEL.NSE", name: "Tata Steel Ltd" },
    { symbol: "BAJAJFINSV.NSE", name: "Bajaj Finserv Ltd" },
    { symbol: "HEROMOTOCO.NSE", name: "Hero MotoCorp Ltd" },
    { symbol: "GRASIM.NSE", name: "Grasim Industries Ltd" },
    { symbol: "CIPLA.NSE", name: "Cipla Ltd" },
    { symbol: "COALINDIA.NSE", name: "Coal India Ltd" },
    { symbol: "NESTLEIND.NSE", name: "Nestle India Ltd" },
    { symbol: "BRITANNIA.NSE", name: "Britannia Industries Ltd" },
    { symbol: "TECHM.NSE", name: "Tech Mahindra Ltd" },
    { symbol: "HDFC.NSE", name: "Housing Development Finance Corporation Ltd" },
    { symbol: "DIVISLAB.NSE", name: "Divi's Laboratories Ltd" },
    { symbol: "HINDALCO.NSE", name: "Hindalco Industries Ltd" },
    { symbol: "JSWSTEEL.NSE", name: "JSW Steel Ltd" },
    { symbol: "BPCL.NSE", name: "Bharat Petroleum Corporation Ltd" },
    { symbol: "EICHERMOT.NSE", name: "Eicher Motors Ltd" },
    { symbol: "ADANIPORTS.NSE", name: "Adani Ports & SEZ Ltd" },
    { symbol: "SHREECEM.NSE", name: "Shree Cement Ltd" },
    { symbol: "INDUSINDBK.NSE", name: "IndusInd Bank Ltd" },
    { symbol: "UPL.NSE", name: "UPL Ltd" },
    { symbol: "TATAMOTORS.NSE", name: "Tata Motors Ltd" },
    { symbol: "DABUR.NSE", name: "Dabur India Ltd" },
    { symbol: "VEDL.NSE", name: "Vedanta Ltd" },
    { symbol: "GAIL.NSE", name: "GAIL (India) Ltd" },
    { symbol: "BOSCHLTD.NSE", name: "Bosch Ltd" },
    { symbol: "PIDILITIND.NSE", name: "Pidilite Industries Ltd" },
    { symbol: "HAVELLS.NSE", name: "Havells India Ltd" },
    { symbol: "SIEMENS.NSE", name: "Siemens Ltd" },
    { symbol: "AMBUJACEM.NSE", name: "Ambuja Cements Ltd" },
    { symbol: "DMART.NSE", name: "Avenue Supermarts Ltd" }
  ];
  
  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          const userData = await getUserData(email);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, [email]);

  const fetchStockData = async (symbol,name) => {
    setLoading(true);
    setError(null);
    try {
      
      const API_KEY = '6715bfb20a2446.06319934';
      const response = await axios.get(
        `https://eodhistoricaldata.com/api/real-time/${symbol}.NSE?api_token=${API_KEY}&fmt=json`
      );
      const stockInfoData = response.data;
      setStock({
        symbol,
        price: stockInfoData.close,
        change: (stockInfoData.close - stockInfoData.previousClose).toFixed(2),
        changePercent: (
          ((stockInfoData.close - stockInfoData.previousClose) / stockInfoData.previousClose) *
          100
        ).toFixed(2) + '%',
        lastUpdated: new Date(stockInfoData.timestamp * 1000).toLocaleDateString(),
      });
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchSymbol.trim()) {
       fetchStockData(searchSymbol.trim().toUpperCase());
      setIsAddedToPortfolio(false);
      setIsAddedToWatchlist(false);
      
      //navigate(`/stock/${searchSymbol.trim().toUpperCase()}`); // Navigate to stock detail page
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setSearchSymbol(value);

    if (value) {
      const filteredCompanies = companies.filter(
        (company) =>
          company.name.toUpperCase().includes(value) || company.symbol.includes(value)
      );
      setSuggestions(filteredCompanies);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (symbol,name) => {
    setSearchSymbol(symbol.replace('.NSE', '')); 
    setSuggestions([]);
    console.log(symbol, name)
    //navigate(`/stock/${symbol}`, { state: { name } }); // Navigate to stock detail page
  };

  const handleAddToPortfolio = async () => {
    if (!user.email) {
      console.error('User email missing');
      setError('User email is required to add to portfolio');
      return;
    }

    if (!stock || !stock.symbol || !stock.price) {
      console.error('Stock data missing');
      setError('Stock data is required to add to portfolio');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/portfolio', {
        userId: user.email,
        symbol: stock.symbol,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        lastUpdated: stock.lastUpdated
      });

      addToPortfolio(stock);
      setIsAddedToPortfolio(true);
    } catch (error) {
      console.error('Error adding to portfolio:', error);
      setError('Error adding stock to portfolio');
    }
  };

  const handleAddToWatchlist = async () => {
    if (!user.email) {
      console.error('User email missing');
      setError("User email is required to add to watchlist");
      return;
    }
  
    if (!stock || !stock.symbol || !stock.price) {
      console.error('Stock data missing');
      setError("Stock data is required to add to watchlist");
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/watchlist', {
        userId: user.email,
        symbol: stock.symbol,
        price: stock.price,
        change: stock.change,
        changePercent: stock.changePercent,
        lastUpdated: stock.lastUpdated
      });
  
      addToWatchlist(stock);
      setIsAddedToWatchlist(true);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      setError('Error adding stock to watchlist');
    }
  };

  const handleNavigateToStockDetails = (symbol,name) =>{
    console.log(companies.name)
    console.log(symbol)
    navigate(`/stock/${symbol}`, { state: { name } });
  }

  return (
    <div className="App">
     <Header />
      {/* Main Content */}
      <div className="main-content">
        <div className='stock-container'>
        <h1 className="stock-search-title">Stock Search</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            value={searchSymbol}
            onChange={handleInputChange}
            placeholder="Search for a stock symbol..."
          />
          <button className="search-button" type="submit">Search</button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((company, index) => (
              <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(company.symbol, company.name)}>
                {company.symbol.replace('.NSE', '')} - {company.name}
              </li>
            ))}
          </ul>
        )}

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {stock && (
          <table className="stock-table">
            <thead>
              <tr>
                <th className="stock-header">Symbol</th>
                <th className="stock-header">Price</th>
                <th className="stock-header">Change</th>
                <th className="stock-header">Change (%)</th>
                <th className="stock-header">Last Updated</th>
                <th className="stock-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-symbol">{stock.symbol}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-price">₹{stock.price}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-change">{stock.change}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="stock-change-percent">{stock.changePercent}</td>
                <td onClick={() => handleNavigateToStockDetails(stock.symbol, stock.name)} className="last-updated">{stock.lastUpdated}</td>
                <td className="icon-cell">
                  {isAddedToPortfolio ? (
                    <i className="fa-solid fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i
                      className="fa-regular fa-address-card"
                      title="Add to portfolio"
                      onClick={handleAddToPortfolio}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  )}
                  {isAddedToWatchlist ? (
                    <i className="fa-solid fa-star" style={{ color: 'gold', marginLeft: '10px' }} title="In Watchlist"></i>
                  ) : (
                    <i
                      className="fa-regular fa-star"
                      title="Add to watchlist"
                      onClick={handleAddToWatchlist}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    ></i>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
