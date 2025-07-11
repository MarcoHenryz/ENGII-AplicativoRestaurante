import { Router } from 'express';
import { RestaurantController } from '../controllers/RestaurantController';

const restaurantRoutes = Router();
const restaurantController = new RestaurantController();

restaurantRoutes.get('/restaurants', restaurantController.list);
restaurantRoutes.get('/restaurants/:id', restaurantController.show);
restaurantRoutes.post('/restaurants/:id/review', restaurantController.createReview);

export { restaurantRoutes };
