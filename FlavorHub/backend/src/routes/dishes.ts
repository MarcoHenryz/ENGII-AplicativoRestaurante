import { Router } from 'express';
import { DishController } from '../controllers/DishController';

const dishRoutes = Router();
const dishController = new DishController();

dishRoutes.post('/dishes/:id/review', dishController.createReview);

export { dishRoutes };
