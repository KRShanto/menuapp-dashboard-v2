import React, { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="h-[100vh] container mt-6 mb-4 ">
      <div className="w-full min-h-screen max-w-[1000px] bg-white rounded-2xl shadow-xl flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2 bg-amber-50 p-12">
          <div className="h-full flex flex-col justify-between">
            {/* <ChefHat className="w-12 h-12 text-amber-500" /> */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2070"
                alt="Chef cooking"
                className="rounded-xl shadow-lg mb-8"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Chef's Portal
              </h2>
              <p className="text-gray-600">
                Access your professional kitchen dashboard and manage your
                culinary journey.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">WELCOME</h1>
              <p className="text-gray-600">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                {/* <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {/* {showPassword ? (
                    // <EyeOff className="h-5 w-5" />
                  ) : (
                    // <Eye className="h-5 w-5" />
                  )} */}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
              >
                Login
              </button>

              <div className="text-center">
                <a
                  href="#"
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  Forgot Your Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
