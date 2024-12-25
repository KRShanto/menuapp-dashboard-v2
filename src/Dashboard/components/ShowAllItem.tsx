import React from "react";
import { ItemsType } from "../../types/Item";
import FoodItemCard from "./FoodItemCard";

export default function ShowAllItem() {
  const list: ItemsType[] = [
    {
      id: 1,
      name: "item1",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      description: "Description is the name of the item1",

      price: 100,
      calories: 240,
    },
    {
      id: 2,
      name: "item2",
      description: "Description is the name of the item2",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 200,
      calories: 200,
    },
    {
      id: 3,
      name: "item3",
      description: "Description is the name of the item3",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 300,
      calories: 300,
    },
    {
      id: 4,
      name: "item4",
      description: "Description is the name of the item4",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 400,
      calories: 400,
    },
    {
      id: 5,
      name: "item5",
      description: "Description is the name of the item5",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 100,
      calories: 500,
    },
    {
      id: 5,
      name: "item5",
      description: "Description is the name of the item5",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 500,
      calories: 500,
    },
    {
      id: 5,
      name: "item5",
      description: "Description is the name of the item5",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 500,
      calories: 500,
    },
    {
      id: 5,
      name: "item5",
      description: "Description is the name of the item5",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: 500,
      calories: 500,
    },
  ];
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-3 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2">
      {list.map((item) => {
        return (
          <div key={item.id}>
            <FoodItemCard
              name={item.name}
              description={item.description}
              image={item.image}
              calories={item.calories}
              price={item.price}
            />
          </div>
        );
      })}
    </div>
  );
}
