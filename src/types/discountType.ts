export interface FoodItemOption {
  id: number;
  name: string;
  image: string;
}
export interface DiscountCategory {
  id: string;
  name: string;
  items: FoodItemOption[];
  rate: number;
  startDate: string;
  endDate: string;
}
