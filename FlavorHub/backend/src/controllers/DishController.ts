import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DishController {
  async createReview(req: Request, res: Response) {
    const { id: dishId } = req.params;
    const { userId, score, comment, suggestedPrice } = req.body;

    if (!userId || !score) {
      return res.status(400).json({ error: 'ID do usuário e nota são obrigatórios.' });
    }

    try {
      const newReview = await prisma.dishReview.create({
        data: {
          userId,
          dishId,
          score,
          comment,
          suggestedPrice,
        }
      });
      return res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Falha ao criar avaliação do prato' });
    }
  }
}
