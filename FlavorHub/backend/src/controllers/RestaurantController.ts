import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RestaurantController {
  async list(req: Request, res: Response) {
    try {
      const restaurants = await prisma.restaurant.findMany();
      return res.json(restaurants);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Falha ao buscar restaurantes' });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id },
        include: {
          dishes: true,
          restaurantReviews: {
            include: {
              user: {
                select: { name: true, avatarUrl: true }
              }
            }
          }
        },
      });

      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurante não encontrado' });
      }
      return res.json(restaurant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Falha ao buscar detalhes do restaurante' });
    }
  }

  async createReview(req: Request, res: Response) {
    const { id: restaurantId } = req.params;
    const { userId, foodScore, serviceScore, ambianceScore, accessibilityScore, comment } = req.body;

    try {
      const newReview = await prisma.restaurantReview.create({
        data: {
          userId,
          restaurantId,
          foodScore,
          serviceScore,
          ambianceScore,
          accessibilityScore,
          comment,
        }
      });
      return res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Falha ao criar avaliação' });
    }
  }
}
