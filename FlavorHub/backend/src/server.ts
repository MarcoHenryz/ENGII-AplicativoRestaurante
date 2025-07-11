import express from 'express';
import cors from 'cors';
import { restaurantRoutes } from './routes/restaurants';
import { dishRoutes } from './routes/dishes';
import { userRoutes } from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', restaurantRoutes);
app.use('/api', dishRoutes);
app.use('/api', userRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 O servidor está rodando em http://localhost:${PORT}`);
});
