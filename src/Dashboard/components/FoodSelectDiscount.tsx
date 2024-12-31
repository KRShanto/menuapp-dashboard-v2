import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { db, MENU_COLLECTION, storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { ItemsType } from "@/types/Item";

export default function FoodSelectDiscount({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: ItemsType | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<ItemsType | null>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ItemsType[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuCollection = collection(db, MENU_COLLECTION);
      const snapshot = await getDocs(menuCollection);
      const menuList = snapshot.docs.map(async (doc) => {
        const src = await getDownloadURL(ref(storage, doc.data().imageURL));
        return {
          ...doc.data(),
          id: doc.id,
          imageURL: src,
        };
      });
      Promise.all(menuList).then((items) => {
        setItems(items as ItemsType[]);
      });
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (item: ItemsType) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mt-5" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex justify-between p-2 px-3 w-full rounded-md border border-foreground/70 bg-transparent  placeholder-foreground/70 outline-none  text-left"
      >
        <span className="text-sm text-foreground/70">
          {selectedItem ? selectedItem.name : "Select Your Discount Items"}
        </span>
        <FaChevronDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className=" w-full
            relative 
            left-0 
            right-0 
            z-10 
            mt-2 
            rounded-md 
            border 
            border-primary-color 
            shadow-lg 
            max-h-44 
            overflow-y-auto
          "
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleOptionClick(item)}
                className={`
                     flex
                     cursor-pointer
                     items-center
                     px-3
                     py-2
                   `}
              >
                <img
                  src={item.imageURL}
                  alt="food for discount ${food.name}"
                  className="w-8 h-8 mr-2 rounded-full"
                />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
