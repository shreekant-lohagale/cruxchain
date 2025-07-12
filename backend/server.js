import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import waitlistRoutes from './routes/waitlist.js';

// Load environment variables
dotenv.config();

const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',  // Your React default port
  'http://localhost:8080',  // Your current frontend port
  // Add other origins as needed for development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Security middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/waitlist', waitlistRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Modern MongoDB connection (removed deprecated options)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    
    console.log('✅ MongoDB Atlas connected successfully');

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`🔗 API Base: http://localhost:${port}/api`);
      console.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
    });

  } catch (err) {
    console.error('❌ MongoDB Atlas connection failed:', err.message);
    process.exit(1);
  }
};

// Connect and start
connectDB();

// Error handling
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  // process.exit(1); // Commented out to prevent server crash during development
});