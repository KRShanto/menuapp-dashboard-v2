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

export function AlertDialogConfirm({
  title,
  selectedItems,
  onDelete,
}: {
  title?: string;
  selectedItems: string[];
  onDelete?: (id: string) => void;
}) {
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
            onClick={() => {
              selectedItems.forEach((id) => onDelete && onDelete(id));
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
