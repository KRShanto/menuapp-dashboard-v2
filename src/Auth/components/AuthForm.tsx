// AuthForm.tsx

import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

interface AuthFormProps {
  formType: "login" | "forgot" | "changePassword";
  onSubmit: (data: { email?: string; password?: string }) => void;
  onForgotPassword?: () => void;
  onBackToLogin?: () => void;
  onChangePassword?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formType,
  onSubmit,
  onForgotPassword,
  onBackToLogin,
  onChangePassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(formType === "login" || formType === "forgot") && (
        <div className="relative">
          <MdEmail
            color="#F2E7D4"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-color text-xl"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="bg-transparent w-full pl-12 pr-4 py-3 border-b-2 border-primary-color focus:outline-none"
            required
          />
        </div>
      )}

      {/* Password Input for Login and Change Password */}
      {formType === "login" && (
        <div className="relative">
          <RiLockPasswordFill
            color="#F2E7D4"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-color text-xl"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-transparent w-full pl-12 pr-10 py-3 border-b-2 border-primary-color focus:outline-none "
            required
          />
          {formType === "login" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <IoEyeSharp className="h-5 w-5" />
              ) : (
                <IoEyeOffSharp className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}
      {formType === "changePassword" && (
        <div className="relative">
          <RiLockPasswordFill
            color="#F2E7D4"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-color text-xl"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            className="bg-transparent w-full pl-12 pr-10 py-3 border-b-2 border-primary-color focus:outline-none "
            required
          />
        </div>
      )}
      {formType === "changePassword" && (
        <div className="relative">
          <RiLockPasswordFill
            color="#F2E7D4"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-color text-xl"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            className="bg-transparent w-full pl-12 pr-10 py-3 border-b-2 border-primary-color focus:outline-none"
            required
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-[70%] bg-primary-color text-black py-3 rounded-2xl"
        >
          {formType === "login" && "Login"}
          {formType === "forgot" && "Submit"}
          {formType === "changePassword" && "Save"}
        </button>
      </div>
      {formType === "login" && onForgotPassword && (
        <div className="text-center">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary-color hover:underline text-sm"
          >
            Forgot Your Password?
          </button>
        </div>
      )}
      {formType === "login" && onChangePassword && (
        <div className="text-center">
          <button
            type="button"
            onClick={onChangePassword}
            className="text-primary-color hover:underline text-sm"
          >
            Change Your Password
          </button>
        </div>
      )}
      {formType === "forgot" && onBackToLogin && (
        <div className="text-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="w-[70%] bg-transparent border border-primary-color  text-primary-color py-3 rounded-2xl"
          >
            Go Back
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
