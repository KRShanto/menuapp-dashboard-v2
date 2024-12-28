import { useEffect, useState } from "react";
import { ItemsType } from "../../types/Item";
import FoodItemCard from "./FoodItemCard";
import SelectComponent from "./SelectComponent";
import { db, MENU_COLLECTION } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function ShowAllItem() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [list, setList] = useState<ItemsType[]>([]);

  // fetch "menu" from firebase
  useEffect(() => {
    const fetchMenu = () => {
      const menuCollection = collection(db, MENU_COLLECTION);
      const q = query(menuCollection, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const menuList = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("menuList", menuList);
        setList(menuList as ItemsType[]);
      });
      return unsub;
    };
    const unsub = fetchMenu();
    return () => unsub();
  }, []);

  const handleSelect = (id: string) => {
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
        {list.map((item, index) => {
          return (
            <div key={index}>
              <FoodItemCard
                name={item.name}
                description={item.description}
                image={
                  item.image ||
                  // TODO: remove this.
                  "https://images.unsplash.com/photo-1550547660-d9450f859349"
                }
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
