import { useState } from "react";
import { Button } from "./ui/button";
import { Form } from "react-router";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Spinner } from "./ui/spinner";

interface PostFormProps {
  handlePOST: (title: string, content: string) => void;
  loadingPost: boolean;
  setLoadingPost: (bol: boolean) => void;
}

function PostForm({ handlePOST, loadingPost, setLoadingPost }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (loadingPost) return;
    let flag = false;
    if (title.trim() === "") {
      const titleInput = window.document.getElementById("title");
      titleInput?.setAttribute("aria-invalid", "true");
      flag = true;
    }
    if (content.trim() === "") {
      const contentInput = window.document.getElementById("content");
      contentInput?.setAttribute("aria-invalid", "true");
      flag = true;
    }
    if (flag) return;
    setLoadingPost(true);
    handlePOST(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <Card className="w-full border border-[#999999]">
      <CardHeader>
        <CardTitle className="flex items-start">
          <h1 className="font-bold">What’s on your mind?</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
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
                id="content"
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
            <Button
              type="submit"
              onClick={(e) => handleCreate(e)}
              className={`bg-blue-codeleap text-white w-26 font-bold place-self-end gap-2 ${title.trim() === "" || content.trim() === "" || loadingPost ? "cursor-not-allowed opacity-35" : "hover:opacity-80"}`}
            >
              Create
              <Spinner className={loadingPost ? "" : "hidden"} />
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PostForm;
