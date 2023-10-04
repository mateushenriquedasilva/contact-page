import express from 'express';
import router from './api/routes/contact-routes';
import sequelize from './config/sequelize';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log('HTTP Server running!');
});