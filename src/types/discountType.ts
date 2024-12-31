export interface FoodItemOption {
  id: number;
  name: string;
  image: string;
}
export interface DiscountCategory {
  id: string;
  name: string;
  itemName: string;
  itemId: string;
  rate: number;
  startDate: string;
  endDate: string;
}
