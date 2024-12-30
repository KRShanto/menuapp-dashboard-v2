import { db, MENU_COLLECTION, MENU_IMAGES } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "@/lib/firebase";
import { useEffect, useState } from "react"; // Added useEffect and useState
import { useForm } from "react-hook-form";
import { z } from "zod";
import SidebarFooter from "../sidebar/SidebarFooter";
import { useSidebar } from "../ui/sidebar";
import { ref, uploadBytes } from "firebase/storage";

// Define the Zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive").nullable(), // Allow null
  description: z.string().min(1, "Description is required"),
  calories: z.number().min(0, "Calories must be positive").nullable(), // Allow null
  image: z.instanceof(File).nullable(), // Allow null
});

type FormInputData = z.infer<typeof schema>;

export default function MenuAdd() {
  const {
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormInputData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      price: null,
      description: "",
      calories: null,
      image: null,
    },
  });

  const [image, setImage] = useState<File | null>(null);
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

    const name = data.get("name");
    const category = data.get("category");
    const price = data.get("price");
    const description = data.get("description");
    const calories = data.get("calories");
    console.log("Uploading image: ", image);

    try {
      console.log("Uploading image: ");
      // Upload image to Firebase Storage
      if (image instanceof File) {
        const imageRef = ref(storage, `${MENU_IMAGES}/${image.name}`);

        const res = await uploadBytes(imageRef, image);

        console.log("Image uploaded successfully: ", res);
      }

      // Add data to Firestore
      await addDoc(collection(db, MENU_COLLECTION), {
        name: name,
        category: category,
        price: price,
        description: description,
        calories: calories,
        imageURL: `${MENU_IMAGES}/${image?.name}`,
        createdAt: new Date(),
      });

      // console.log("Data uploaded successfully");

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
              const file = e.target.files?.[0];
              if (file instanceof File) {
                setImage(file);
                setValue("image", file);
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
            Item Name
          </label>
          <input
            {...register("name")}
            placeholder="Enter Item Name"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="category"
          >
            Category
          </label>
          <input
            {...register("category")}
            placeholder="Enter Category Name"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter Description"
            className="h-24 w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="calories"
          >
            Calories
          </label>
          <input
            {...register("calories", { valueAsNumber: true })}
            placeholder="Enter Calories"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.calories && (
            <span className="text-red-500">{errors.calories.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>

        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="price"
          >
            Price
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            placeholder="Enter Price"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}{" "}
          {/* Changed error color */}
        </div>
      </div>

      <SidebarFooter
        successBtnText="Add"
        disabled={!isValid} // Use formState.isValid
      />
    </form>
  );
}
