import SidebarFooter from "../sidebar/SidebarFooter";
import { db, auth, MANAGER_COLLECTION } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useSidebar } from "../ui/sidebar";

export default function ManagerAdd() {
  const { setOpen } = useSidebar();

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
    } catch (error) {
      console.error("Error adding document: ", error);
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
            name="name"
            required
          />
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
            name="email"
            required
          />
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
            name="password"
            required
          />
        </div>
      </div>
      <SidebarFooter successBtnText="Add" />
    </form>
  );
}
