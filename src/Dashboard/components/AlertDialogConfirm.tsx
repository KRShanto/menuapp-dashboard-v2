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

export function AlertDialogConfirm() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-[#DC3545]">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-navbgprimary rounded-lg ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary-color text-center blur-none">
            Are You Sure to Delete Selected Items?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2">
          <AlertDialogCancel className="border border-primary-color bg-transparent text-primary-color hover:bg-transparent hover:text-primary-color">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-primary-color text-black hover:text-primary-color">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
