import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', userController.create);
userRoutes.get('/users/:id', userController.profile);
userRoutes.post('/login', userController.login); 

export { userRoutes };