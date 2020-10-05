import express from 'express';
import dotenv from 'dotenv';
import color from 'colors';

import { notFound, errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import oredrRoutes from './routes/orderRoutes.js';

dotenv.config();

connectDB();

const app = express();

// bodyParser, allows to accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', oredrRoutes);

app.use(notFound);

// overwrite the default error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
