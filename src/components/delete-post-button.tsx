import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import TrashIcon from "../assets/trash-icon.svg?react";

interface DeletePostButtonProps {
  id: number;
  handleDELETE: (id: number) => void;
}

function DeletePostButton({ handleDELETE, id }: DeletePostButtonProps) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 m-0 bg-transparent hover:bg-transparent! hover:opacity-40"
          >
            <TrashIcon className="size-7" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-describedby={undefined}
          className="bg-card min-w-xl flex flex-col gap-8"
        >
          <AlertDialogTitle asChild>
            <h1>Are you sure you want to delete this item?</h1>
          </AlertDialogTitle>
          <div className="w-full flex justify-end gap-4">
            <AlertDialogCancel
              variant={"outline"}
              className="bg-transparent hover:bg-gray-200! dark:hover:bg-zinc-800! font-bold w-26 rounded-md"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDELETE(id)}
              className="bg-red-codeleap! text-white hover:opacity-70 font-bold w-26 rounded-md"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeletePostButton;
