const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();


connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);

// Sample company data (this could come from a database or another API)
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

// Endpoint to search for companies based on input
app.get('/search', (req, res) => {
  const query = req.query.q.toUpperCase();
  const filteredCompanies = companies.filter(company =>
    company.name.toUpperCase().includes(query) || company.symbol.includes(query)
  );
  res.json(filteredCompanies);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
