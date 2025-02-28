import SidebarFooter from "../sidebar/SidebarFooter";
import { db, auth, MANAGER_COLLECTION } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useSidebar } from "../ui/sidebar";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputData {
  name: string;
  email: string;
  password: string;
}
export default function ManagerAdd() {
  const { setOpen } = useSidebar();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
  } = useForm<FormInputData>({
    mode: "onChange",
  });

  async function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await addDoc(collection(db, MANAGER_COLLECTION), {
        name,
        email,
        uid: user.uid,
      });

      setOpen(false, undefined);
    } catch (error: any) {
      // check if auth/email-already-in-use
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("An error occurred");
        console.error("Error adding document: ", error);
      }
    }
  }

  return (
    // @ts-ignore
    <form className="h-[90%] p-3" action={handleSubmit}>
      <div className="h-[95%]">
        <div className="relative mt-4">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="relative mt-4">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <SidebarFooter successBtnText="Add" />
    </form>
  );
}
