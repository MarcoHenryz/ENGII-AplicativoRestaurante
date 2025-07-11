export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Dish {
  id: string;
  name:string;
  price: number;
  imageUrl?: string;
  // Adicionar a média de avaliações se a API fornecer
}

export interface RestaurantReview {
    id: string;
    comment?: string;
    user: User;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  imageUrl?: string;
  openingTime?: string;
  dishes: Dish[];
  restaurantReviews: RestaurantReview[];
}