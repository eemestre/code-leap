import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import DeletePostButton from "./delete-post-button";
import EditPostButton from "./edit-post-button";

interface PostCardProps {
  author_ip: string;
  content: string;
  created_datetime: string;
  id: number;
  title: string;
  username: string;
  loggedUser: string;
  handleDELETE: (id: number) => void;
  handlePATCH: (id: number, title: string, content: string) => void;
}

function PostCard(props: PostCardProps) {
  const [postDate, setPostDate] = useState<string>("");

  useEffect(() => {
    formatTime();
  }, [props]);

  // formats the post time
  const formatTime = () => {
    const now = new Date();
    const createdAt = new Date(props.created_datetime);
    if (now.getTime() - createdAt.getTime() < 60000) {
      setPostDate("Just now");
    } else if (now.getTime() - createdAt.getTime() < 3600000) {
      const minutes = Math.trunc((now.getTime() - createdAt.getTime()) / 60000);
      setPostDate(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
    } else if (now.getTime() - createdAt.getTime() < 86400000) {
      const hours = Math.trunc((now.getTime() - createdAt.getTime()) / 3600000);
      setPostDate(`${hours} hour${hours > 1 ? "s" : ""} ago`);
    } else {
      const days = Math.trunc((now.getTime() - createdAt.getTime()) / 86400000);
      setPostDate(`${days} day${days > 1 ? "s" : ""} ago`);
    }
  };

  return (
    <Card className="w-full p-0 m-0 gap-0 border border-[#999999]">
      <CardHeader className="p-0 m-0">
        <CardTitle className="bg-blue-codeleap py-4 px-6 flex justify-between items-center">
          <h1 className="text-white font-bold">{props.title}</h1>
          <div
            className={`flex gap-4 ${props.loggedUser === props.username ? "" : "hidden"}`}
          >
            <DeletePostButton handleDELETE={props.handleDELETE} id={props.id} />
            <EditPostButton
              handlePATCH={props.handlePATCH}
              id={props.id}
              originalTitle={props.title}
              originalContent={props.content}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 px-6 m-0 flex flex-col gap-2 text-lg">
        <div className="flex justify-between text-gray-500 dark:text-blue-codeleap">
          <h2>@{props.username}</h2>
          <h2>{postDate}</h2>
        </div>
        <p className="wrap-break-word whitespace-pre-wrap">{props.content}</p>
      </CardContent>
    </Card>
  );
}

export default PostCard;
