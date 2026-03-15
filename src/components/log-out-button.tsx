import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

function LogOutButton() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogOut = (e: any) => {
    e.preventDefault();
    setOpen(false);
    localStorage.removeItem("loggedUser");
    navigate("/signup");
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className={`size-11 rounded-full absolute top-25 right-10`}
            variant="secondary"
          >
            <span>
              <LogOut />
            </span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-describedby={undefined}
          className="bg-card flex flex-col gap-4"
        >
          <AlertDialogTitle asChild>
            <h1>Confirm Log Out?</h1>
          </AlertDialogTitle>
          <div className="flex gap-4 justify-center">
            <AlertDialogCancel
              variant={"outline"}
              className="bg-transparent hover:bg-gray-200! dark:hover:bg-zinc-800! font-bold w-26 rounded-md"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              onClick={(e) => handleLogOut(e)}
              className={`bg-red-codeleap! text-white font-bold w-26 rounded-md hover:opacity-70`}
            >
              Log Out
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default LogOutButton;
