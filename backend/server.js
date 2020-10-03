import express from 'express';
import dotenv from 'dotenv';
import color from 'colors';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

app.use('/api/products', productRoutes);

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
