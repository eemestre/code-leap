import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import EditIcon from "../assets/edit-icon.svg?react";
import { Form } from "react-router";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface EditPostButtonProps {
  id: number;
  originalTitle: string;
  originalContent: string;
  handlePATCH: (id: number, title: string, content: string) => void;
}

function EditPostButton({
  handlePATCH,
  id,
  originalTitle,
  originalContent,
}: EditPostButtonProps) {
  const [title, setTitle] = useState<string>(originalTitle);
  const [content, setContent] = useState<string>(originalContent);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = (e: any) => {
    e.preventDefault();
    let flag = false;
    if (title.trim() === "") {
      const titleInput = window.document.getElementById("edit-title");
      titleInput?.setAttribute("aria-invalid", "true");
      flag = true;
    }
    if (content.trim() === "") {
      const contentInput = window.document.getElementById("edit-content");
      contentInput?.setAttribute("aria-invalid", "true");
      flag = true;
    }
    if (flag) return;
    handlePATCH(id, title, content);
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 m-0 bg-transparent hover:bg-transparent! hover:opacity-40"
          >
            <EditIcon className="size-7" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-describedby={undefined}
          className="bg-card min-w-xl flex flex-col gap-4"
        >
          <AlertDialogTitle asChild>
            <h1>Edit item</h1>
          </AlertDialogTitle>
          <Form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  placeholder="Hello World!"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    e.target.setAttribute("aria-invalid", "false");
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  placeholder="Content here"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    e.target.setAttribute("aria-invalid", "false");
                  }}
                  className="h-22 resize-none"
                />
              </div>
              <div className="w-full flex justify-end gap-4">
                <AlertDialogCancel
                  variant={"outline"}
                  className="bg-transparent hover:bg-gray-200! dark:hover:bg-zinc-800! font-bold w-26 rounded-md"
                  onClick={() => {
                    setTitle(originalTitle);
                    setContent(originalContent);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  onClick={(e) => handleSave(e)}
                  className={`bg-green-codeleap! text-white font-bold w-26 rounded-md ${title.trim() === "" || content.trim() === "" ? "cursor-not-allowed opacity-35" : "hover:opacity-70"}`}
                >
                  Save
                </AlertDialogAction>
              </div>
            </div>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default EditPostButton;
