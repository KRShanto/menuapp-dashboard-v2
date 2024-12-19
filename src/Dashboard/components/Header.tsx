import UserProfile from "./UserProfile";


export function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">All Menu Items</h1>
        <p className="text-gray-400 text-sm">4th December, 2024 - 11:30 PM</p>
      </div>
      <div className="flex items-center space-x-4">
        <UserProfile />
      </div>
    </div>
  );
}
