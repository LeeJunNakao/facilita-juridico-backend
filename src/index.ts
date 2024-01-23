import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { initDb } from './database';
import { mountApp } from './container';

dotenv.config();

const startServer = async () => {
  const PORT = process.env.PORT;

  const db = initDb();
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: '*' }));

  mountApp(app, db);

  app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
  });
};

startServer();
