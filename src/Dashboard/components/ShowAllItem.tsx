import { useEffect, useState } from "react";
import { ItemsType } from "../../types/Item";
import FoodItemCard from "./FoodItemCard";
import SelectComponent from "./SelectComponent";
import { db, MENU_COLLECTION, storage } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";

export default function ShowAllItem() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [list, setList] = useState<ItemsType[]>([]);

  // fetch "menu" from firebase
  useEffect(() => {
    const fetchMenu = () => {
      const menuCollection = collection(db, MENU_COLLECTION);
      const q = query(menuCollection, orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const menuList = snapshot.docs.map(async (doc) => {
          const src = await getDownloadURL(ref(storage, doc.data().imageURL));
          return {
            ...doc.data(),
            id: doc.id,
            imageURL: src,
          };
        });
        Promise.all(menuList).then((items) => {
          setList(items as ItemsType[]);
        });
        // console.log("menuList", menuList);
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

  async function handleDelete(id: string) {
    try {
      await deleteDoc(doc(db, MENU_COLLECTION, id));
    } catch (error) {
      console.error("Error deleting documents: ", error);
    }
  }

  return (
    <div className="space-y-4">
      <SelectComponent
        selectAll={selectAll}
        selectedItems={selectedItems}
        cancelSelection={cancelSelection}
        titleText={consfirmationTitle}
        isSelected={selectedItems.length === list.length}
        onSelect={selectAll}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-4 grid-rows-2 gap-3 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 ">
        {list.map((item, index) => {
          return (
            <div key={index}>
              <FoodItemCard
                name={item.name}
                description={item.description}
                image={item.imageURL}
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
