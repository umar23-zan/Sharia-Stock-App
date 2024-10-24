import React, { Component, useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import signup from '../images/Signup.png';
import investing from '../images/Halal investing.png';
import opportunities from '../images/opportunities.png';
import halalway from '../images/Halal way.png';
import portfolio from '../images/Portfolio.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../design.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Design() {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  const fetchStockData = async (symbol) => {
    setLoading(true);
    setError(null);
    try {
      const API_KEY = '670cbdcb5d6a98.28595369';
      const response = await axios.get(`https://eodhistoricaldata.com/api/real-time/${symbol}?api_token=${API_KEY}&fmt=json`);

      const stockInfoData = response.data;
      setStock({
        symbol,
        price: stockInfoData.close,
        change: (stockInfoData.close - stockInfoData.previousClose).toFixed(2),
        changePercent: (((stockInfoData.close - stockInfoData.previousClose) / stockInfoData.previousClose) * 100).toFixed(2) + '%',
        lastUpdated: new Date(stockInfoData.timestamp * 1000).toLocaleDateString(),
      });
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchSymbol.trim()) {
      fetchStockData(searchSymbol.trim().toUpperCase());
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setSearchSymbol(value);

    if (value) {
      try {
        const response = await axios.get(`http://localhost:5000/search?q=${value}`);
        setSuggestions(response.data); // Update suggestions from backend
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (symbol) => {
    setSearchSymbol(symbol); // Set the clicked suggestion as the search symbol
    setSuggestions([]); // Clear suggestions
    fetchStockData(symbol); // Fetch stock data for the selected symbol
  };

//   Chart Component
const [niftyData, setNiftyData] = useState(null);
const [selectedRange, setSelectedRange] = useState('1w');
const [historicalData, setHistoricalData] = useState([]);

const fetchNiftyData = async () => {
  const API_KEY = '670cbdcb5d6a98.28595369';
  const endpoint = 'HDFCBANK.NSE';
  const startDate = '2023-10-23';
  const endDate = '2024-10-21';

  try {
    const response = await axios.get(`https://eodhistoricaldata.com/api/eod/${endpoint}?api_token=${API_KEY}&fmt=json&from=${startDate}&to=${endDate}`);
    const data = response.data;

    setHistoricalData(data);
    filterDataByRange(selectedRange, data);
  } catch (error) {
    console.log("Error fetching Nifty 50 data", error);
  }
};

const filterDataByRange = (range, data) => {
  let filteredData;
  const today = new Date('2024-10-21');

  const dateRange = {
    '1w': 7,
    '1m': 30,
    '6m': 180,
    '1y': 365,
  };

  filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    const differenceInDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
    return differenceInDays <= dateRange[range];
  });

  const labels = filteredData.map(item => new Date(item.date).toLocaleDateString());
  const prices = filteredData.map(item => item.close);

  setNiftyData({
    labels,
    datasets: [{
      label: `Nifty 50 Price (${range})`,
      data: prices,
      fill: false,
      borderColor: '#00A86B',
      tension: 0.1,
      pointRadius: 0,
      borderWidth: 1
    }]
  });
};

useEffect(() => {
  fetchNiftyData();
}, []);

useEffect(() => {
  if (historicalData.length > 0) {
    filterDataByRange(selectedRange, historicalData);
  }
}, [selectedRange]);

const handleRangeChange = (range) => {
  setSelectedRange(range);
};

const chartOptions = {
  scales: {
    x: {
      grid: {
        display: false
      },
      title: {
        display: true,
        text: 'Date'
      }
    },
    y: {
      grid: {
        display: false
      },
      title: {
        display: true,
        text: 'Price (INR)'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

const latestClosePrice = historicalData.length > 0 ? historicalData[historicalData.length - 1].close : null;

  return (
    <div>
      <div className='header'>
        <h2 className='header-title'>ShariaStock</h2>
        <div className='header-button'>
            <Link to="/login">
                <button className='login'>LOGIN</button>
            </Link>
            <Link to="/signup">
                <button className='signup'>SIGNUP</button>
            </Link>
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
      <div className='stock-contanier'>
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
              <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(company.symbol)}>
                {company.symbol} - {company.name}
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="stock-symbol">{stock.symbol}</td>
                <td className="stock-price">₹{stock.price}</td>
                <td className="stock-change">{stock.change}</td>
                <td className="stock-change-percent">{stock.changePercent}</td>
                <td className="last-updated">{stock.lastUpdated}</td>
              </tr>
            </tbody>
          </table>
        )};

        
        

      </div>


      {/* Chart Component */}
      <div className='market-container'>
        <h2>Market Today</h2>
         {/* Display latest close price */}
         

      {/* Nifty 50 Chart with Range Buttons */}
      <div className="nifty-chart-container">
        <h3>HDFC</h3>
        {latestClosePrice && (
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>
            Previous Close Price: ₹{latestClosePrice}
          </div>
        )}
        <div className='chart-components'>
          <div className="range-buttons">
            <button onClick={() => handleRangeChange('1w')}>1 Week</button>
            <button onClick={() => handleRangeChange('1m')}>1 Month</button>
            <button onClick={() => handleRangeChange('6m')}>6 Months</button>
            <button onClick={() => handleRangeChange('1y')}>1 Year</button>
          </div>

          {/* Chart Wrapper with Smaller Size */}
          <div style={{ width: '500px', height: '300px' }}>
            {niftyData ? (
              <Line data={niftyData} options={chartOptions} />
            ) : (
              <div>Loading Nifty 50 data...</div>
            )}
          </div>
        </div>
        
      </div>
      </div>
    </div>
  );
}
