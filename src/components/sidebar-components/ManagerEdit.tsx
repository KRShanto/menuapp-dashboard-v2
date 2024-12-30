import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react"; // Added useEffect and useState
import { useForm } from "react-hook-form";
import { z } from "zod";
import SidebarFooter from "../sidebar/SidebarFooter";
import { useSidebar } from "../ui/sidebar";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  db,
  MANAGER_COLLECTION,
  MANAGER_DEFAULT_IMAGE,
  storage,
} from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Define the Zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email_address: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});
type FormInputData = z.infer<typeof schema>;

export default function ManagerEdit() {
  const {
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputData>({
    resolver: zodResolver(schema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email_address: "",
      phone: "",
    },
  });

  const [imageChanged, setImageChanged] = useState(false);
  const { setOpen, sidebarData } = useSidebar();
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

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

  useEffect(() => {
    setValue("name", sidebarData.name);
    setValue("email_address", sidebarData.email);
    setValue("phone", sidebarData.phone);
    setImageURL(sidebarData.imageURL);
  }, [sidebarData, setValue]);

  async function onSubmit(data: FormData) {
    const name = data.get("name");
    const email = data.get("email_address");
    const phone = data.get("phone");

    let imageURL = null;

    try {
      // Upload image to Firebase Storage
      if (imageChanged && image) {
        const storageRef = ref(storage, `images/${image?.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageURL = url;

        // delete old image
        if (sidebarData.imageURL !== MANAGER_DEFAULT_IMAGE) {
          const oldImageRef = ref(storage, sidebarData.imageURL);
          // Delete the file
          await deleteObject(oldImageRef);
        }
      }

      // Update doc in Firestore
      await updateDoc(doc(db, MANAGER_COLLECTION, sidebarData.id), {
        name,
        email,
        phone,
        imageURL,
      });

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
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
                setImageChanged(true);
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
            value={sidebarData.name}
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
            value={sidebarData.email}
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
            value={sidebarData.phone}
            className="h-8 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>
      </div>

      <SidebarFooter
        successBtnText="Save"
        disabled={!isValid} // Use formState.isValid
      />
    </form>
  );
}
