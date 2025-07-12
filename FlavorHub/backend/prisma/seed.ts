import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o processo de seed...`);

  await prisma.dishReview.deleteMany();
  await prisma.restaurantReview.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'teste@email.com',
      name: 'Usuário de Teste',
      password: '123',
    },
  });
  console.log(`Usuário de teste criado: ${user.name}`);

  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Churrascaria Gralha Azul',
      address: 'Av. Gralha Azul, 123, Arapongas, PR',
      imageUrl: 'https://placehold.co/400x250/964B00/FFF?text=Gralha+Azul',
      dishes: {
        create: [
          { name: 'Picanha na Chapa', description: 'Suculenta picanha fatiada, servida na chapa com farofa e vinagrete.', price: 89.90 },
          { name: 'Costela no Bafo', description: 'Costela assada lentamente por 8 horas, desmanchando.', price: 79.90 },
          { name: 'Frango Atropelado', description: 'Frango desossado e grelhado na brasa.', price: 59.90 },
        ],
      },
    },
  });
  console.log(`Restaurante criado: ${restaurant1.name}`);

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Pizzaria Forno a Lenha',
      address: 'Rua das Araras, 456, Arapongas, PR',
      imageUrl: 'https://placehold.co/400x250/FF4500/FFF?text=Forno+a+Lenha',
      dishes: {
        create: [
          { name: 'Pizza de Calabresa', description: 'Molho de tomate, mussarela, calabresa e cebola.', price: 45.00 },
          { name: 'Pizza Quatro Queijos', description: 'Mussarela, provolone, parmesão e gorgonzola.', price: 55.00 },
          { name: 'Pizza de Frango com Catupiry', description: 'Frango desfiado, milho e catupiry original.', price: 52.00 },
        ],
      },
    },
  });
  console.log(`Restaurante criado: ${restaurant2.name}`);

  const restaurant3 = await prisma.restaurant.create({
    data: {
      name: 'Cantina da Nona',
      address: 'Av. Arapongas, 789, Centro, Arapongas, PR',
      imageUrl: 'https://placehold.co/400x250/008000/FFF?text=Cantina',
      dishes: {
        create: [
          { name: 'Spaghetti à Bolonhesa', description: 'Massa fresca com o tradicional molho à bolonhesa da nona.', price: 38.50 },
          { name: 'Lasanha de Carne', description: 'Camadas de massa, molho bolonhesa, queijo e presunto.', price: 42.00 },
        ],
      },
    },
  });
  console.log(`Restaurante criado: ${restaurant3.name}`);

  console.log(`Seed finalizado com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
