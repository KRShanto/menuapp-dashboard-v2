import React from "react";

export default function TopBar() {
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    month: "long",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return (
    <div className="flex justify-between items-center h-full px-4 border-b border-[#1F1F20]">
      {/* show current date */}
      <div>{`${day}${daySuffix(
        day
      )} ${formattedDate},${year} - ${formattedTime}`}</div>
      <div className="flex items-center gap-2">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="User Profile"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <span>Fahim Ahmed</span>
          <span className="text-[#7A766E]">Admin</span>
        </div>
      </div>
    </div>
  );
}
