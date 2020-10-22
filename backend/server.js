import express from 'express';
import dotenv from 'dotenv';
import color from 'colors';
import path from 'path';
import morgan from 'morgan';

import { notFound, errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import oredrRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// bodyParser, allows to accept JSON data in the body
app.use(express.json({ extended: false }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', oredrRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// __diranem not availabe if we use ES modules, only if we use require syntax
const __dirname = path.resolve();
// making 'uploads' directory static, so it'll be
// accessible from browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).send('API is running');
  });
}

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
