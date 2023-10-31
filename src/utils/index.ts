
export function getRestaurantsByMeal(data: Types.DishesData[], meal: Types.Meal): string[] {
  return Array.from(new Set(data.filter(dish => dish.availableMeals.includes(meal)).map(item => item.restaurant)))
}

export function getAvailableDishByRestaurant(data: Types.DishesData[], meal: Types.Meal, restaurant: string): string[] {
  return data
    .filter(dish => dish.availableMeals.includes(meal))
    .filter(dish => dish.restaurant === restaurant)
    .map(dish => dish.name)
}

export function generateRandomID(length = -8): string {
  return Math.random().toString(36).slice(length)
}
