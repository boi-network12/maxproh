// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pricingRoutes = require('./routes/pricing');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to mongoose
connectDB();

const allowedOrigins = [
  'http://localhost:3000',
  'https://maxproh.pxxl.click', 
  'https://maxproh.vercel.app', 
];

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', pricingRoutes);

app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
