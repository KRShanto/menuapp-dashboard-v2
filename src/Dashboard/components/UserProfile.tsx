export default function UserProfile() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-white text-sm">Fahim Ahmed</p>
        <p className="text-gray-400 text-xs">Admin</p>
      </div>
    </div>
  );
}
