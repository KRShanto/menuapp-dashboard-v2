import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export function AlertDialogConfirm({
  title,
  selectedItems,
}: {
  title?: string;
  selectedItems: string[];
}) {
  async function handleDelete() {
    try {
      const deletePromises = selectedItems.map((id) =>
        deleteDoc(doc(db, "menu", id))
      );
      await Promise.all(deletePromises);
      // Optionally, add feedback or state updates here
    } catch (error) {
      console.error("Error deleting documents: ", error);
      // Optionally, handle the error in the UI
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-[#DC3545]">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-navbgprimary rounded-lg ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-center blur-none font-normal">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2">
          <AlertDialogCancel className="border border-primary-color bg-transparent text-primary-color hover:bg-transparent hover:text-primary-color">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-color text-black hover:text-primary-color"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
