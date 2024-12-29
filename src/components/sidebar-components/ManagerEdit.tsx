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
  image: z.instanceof(File).nullable().optional(),
});
type FormInputData = z.infer<typeof schema>;

export default function ManagerEdit() {
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
      </div>

      <SidebarFooter
        successBtnText="Save"
        disabled={!isValid} // Use formState.isValid
      />
    </form>
  );
}
