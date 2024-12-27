import React from "react";
import { ItemsType } from "../../types/Item";
import FoodItemCard from "./FoodItemCard";
import SelectComponent from "./SelectComponent";

export default function ShowAllItem() {
  const initialList: ItemsType[] = [
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
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = React.useState<ItemsType[]>(initialList);

  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const selectAll = () => {
    setSelectedItems(list.map((item) => item.id));
  };
  const cancelSelection = () => {
    setSelectedItems([]);
  };
  const consfirmationTitle = "Are You Sure to Delete Selected Items?";
  return (
    <div className="space-y-4">
      <SelectComponent
        selectAll={selectAll}
        selectedItems={selectedItems}
        cancelSelection={cancelSelection}
        titleText={consfirmationTitle}
        isSelected={selectedItems.length === list.length}
        onSelect={selectAll}
      />
      <div className="grid grid-cols-4 grid-rows-2 gap-3 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 ">
        {list.map((item) => {
          return (
            <div key={item.id}>
              <FoodItemCard
                name={item.name}
                description={item.description}
                image={item.image}
                calories={item.calories}
                price={item.price}
                isSelected={selectedItems.includes(item.id)}
                onSelect={() => handleSelect(item.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
