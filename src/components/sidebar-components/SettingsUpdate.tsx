import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"; // Added useEffect and useState
import { useForm } from "react-hook-form";
import { z } from "zod";
import SidebarFooter from "../sidebar/SidebarFooter";
import { useSidebar } from "../ui/sidebar";

// Define the Zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email_address: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  username: z.string().min(1, "Username is required"),
  old_password: z.string().min(1, "Old password is required"),
  new_password: z.string().min(1, "New password is required"),
  confirm_password: z.string().min(1, "Confirm password is required"),
  image: z.instanceof(File).nullable().optional(),
});
type FormInputData = z.infer<typeof schema>;

export default function SettingsUpdate() {
  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputData>({
    resolver: zodResolver(schema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email_address: "",
      phone: "",
      username: "",
      old_password: "",
      new_password: "",
      confirm_password: "",
      image: null,
    },
  });

  const image = watch("image");
  const [imageURL, setImageURL] = useState<string | null>(null);

  const { setOpen } = useSidebar();

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImageURL(url);

      // Clean up the object URL when the component unmounts or when image changes
      return () => {
        URL.revokeObjectURL(url);
        setImageURL(null);
      };
    } else {
      setImageURL(null);
    }
  }, [image]);

  async function onSubmit(data: FormData) {
    console.log("Form Submitted", data);

    // const name = data.get("name");
    // const email = data.get("email_address");
    // const username = data.get("username");
    // const phone = data.get("phone");
    // const old_password = data.get("old_password");
    // const new_password = data.get("new_password");
    // const confirm_password = data.get("confirm_password");


    // eslint-disable-next-line prefer-const
    // let imageURL = null;

    try {
      // TODO Upload image to Firebase Storage
      /*
      if (data.image) {
        const storageRef = ref(storage, `images/${data.image.name}`);
        await uploadBytes(storageRef, data.image);
        const imageURL = await getDownloadURL(storageRef);
        data.imageURL = imageURL;
      }
        */

      // Add data to Firestore
      // await addDoc(collection(db, MENU_COLLECTION), {
      //   name: data.name,
      //   email: data.email_address,
      //   phone: data.phone,
      //   username: data.username,
      //   old_password: data.old_password,
      //   new_password: data.new_password,
      //   confirm_password: data.confirm_password,
      //   createdAt: new Date(),
      //   imageURL: null,
      // });

      console.log("Data uploaded successfully");

      // Close the sidebar
      setOpen(false, undefined);
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  }

  return (
    // @ts-ignore
    <form action={onSubmit} className="h-[97%] p-3">
      <div className="h-[95%]">
        <div className="relative">
          {/* if image dropped, then show the image else show a black box */}
          {imageURL ? (
            <img
              src={imageURL}
              alt="Item"
              className="h-60 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="h-60 w-full rounded-lg bg-neutral-900/50" />
          )}

          {/* File input to select image */}
          <input
            {...register("image")}
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setValue("image", e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="absolute bottom-0 right-0 rounded-tl-md bg-[#2B2A2C] p-3">
            {/* Label for file input. it should be bottom little up and little right of the image */}
            <label
              htmlFor="file"
              className="cursor-pointer rounded-md bg-foreground px-10 text-black"
            >
              Add Image
            </label>
          </div>
        </div>

        <div className="relative mt-4">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name")}
            value="Fahim"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="email_address"
          >
            Email Address
          </label>
          <input
            {...register("email_address")}
            type="email"
            value="fahim@gmail.com"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.email_address && (
            <span className="text-red-500">{errors.email_address.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="description"
          >
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="tel"
            value="01700000000"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="calories"
          >
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            value="fahimone"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="old_password"
          >
            Old Password
          </label>
          <input
            {...register("old_password", {
              required: "Old password is required",
            })}
            type="password"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.old_password && (
            <span className="text-red-500">{errors.old_password.message}</span>
          )}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="new_password"
          >
            New Password
          </label>
          <input
            {...register("new_password", {
              required: "New password is required",
            })}
            type="password"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.new_password && (
            <span className="text-red-500">{errors.new_password.message}</span>
          )}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <input
            {...register("confirm_password", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("new_password") || "Passwords do not match",
            })}
            type="password"
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.confirm_password && (
            <span className="text-red-500">
              {errors.confirm_password.message}
            </span>
          )}
        </div>
      </div>

      <SidebarFooter
        successBtnText="Add"
        disabled={!isValid} // Use formState.isValid
      />
    </form>
  );
}
