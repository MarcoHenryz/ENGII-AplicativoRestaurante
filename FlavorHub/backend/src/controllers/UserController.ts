import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Este e-mail já está em uso.' });
      }

      const newUser = await prisma.user.create({ data: { name, email, password } });
      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Falha ao criar usuário' });
    }
  }

  async profile(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userProfile = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
          dishReviews: {
            orderBy: { createdAt: 'desc' },
            include: {
              dish: {
                select: {
                  name: true,
                  restaurant: { select: { name: true } }
                }
              }
            }
          },
          restaurantReviews: {
            orderBy: { createdAt: 'desc' },
            include: {
              restaurant: { select: { name: true } }
            }
          }
        }
      });

      if (!userProfile) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.json(userProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Falha ao buscar perfil do usuário' });
    }
  }
}
