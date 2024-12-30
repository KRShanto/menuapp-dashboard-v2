import React, { useState } from "react";
import AuthForm from "./AuthForm";
import AlBaharat from "../../assets/icons/albaharat.svg?react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthPage: React.FC = () => {
  const [formType, setFormType] = useState<
    "login" | "forgot" | "changePassword"
  >("login");
  const [error, setError] = useState("");

  const handleSubmit = async (data: { email?: string; password?: string }) => {
    if (formType === "login") {
      // Handle login
      try {
        await signInWithEmailAndPassword(auth, data.email!, data.password!);

        // Signed in
        window.location.href = "/dashboard";
      } catch (error) {
        setError("Invalid email or password");
      }
    } else if (formType === "forgot") {
      // Handle password reset
      console.log("Forgot Password data:", data);
    } else if (formType === "changePassword") {
      // Handle password change
      console.log("Change Password data:", data);
    }
  };

  const handleForgotPassword = () => {
    setFormType("forgot");
  };

  const handleBackToLogin = () => {
    setFormType("login");
  };
  const handlePasswordChange = () => {
    setFormType("changePassword");
  };

  return (
    <div className="p-4 mx-auto">
      <div className="w-full h-screen rounded-2xl flex">
        <img
          src="src/assets/images/image.png"
          alt=""
          className="min-h-full md:w-[50%] lg:w-1/2"
        />
        {/* Right Side - Auth Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-[#F2E7D4]">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <div className="mb-6">
                <AlBaharat />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-primary-color tracking-wider">
                {formType === "login" && "WELCOME"}
                {formType === "forgot" && "Forgot Your Password?"}
                {formType === "changePassword" && "CHANGE PASSWORD"}
              </h1>
              <p className="text-2xl">
                {formType === "login" && "Login to your account"}
                {formType === "forgot" &&
                  "Enter your email for password recovery"}
                {formType === "changePassword" && "Enter new password"}
              </p>
            </div>

            <p className="text-red-500 text-center mb-4">{error}</p>

            <AuthForm
              formType={formType}
              onSubmit={handleSubmit}
              onForgotPassword={handleForgotPassword}
              onBackToLogin={handleBackToLogin}
              onChangePassword={handlePasswordChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
