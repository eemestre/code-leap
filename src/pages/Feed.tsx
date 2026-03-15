import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import PostCard from "../components/post-card";
import PostForm from "../components/post-form";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "../components/ui/spinner";
import Error404 from "./Error404";
import LogOutButton from "../components/log-out-button";

interface DataProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    username: string;
    created_datetime: string;
    title: string;
    content: string;
    author_ip: string;
  }[];
}

function Feed() {
  const api = "https://dev.codeleap.co.uk/careers/";
  const { user } = useParams();
  const { data, httpConfig, method } = useFetch(api); // data recevied from requests
  // empty data object
  const emptyData = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
  const [loadingPage, setLoadingPage] = useState<boolean>(true); // loading page while data fetch
  const [loadingPost, setLoadingPost] = useState<boolean>(false); // loading post submition
  const [feedData, setFeedData] = useState<DataProps>(emptyData); // the feed data the page needs
  const [nextUrl, setNextUrl] = useState<string | null>(null); // next posts url
  const observer = useRef<IntersectionObserver | null>(null); // infinite scroll observer
  const [isPagination, setIsPagination] = useState(false); // controlls pagination

  // handles data according to used method when data changes
  useEffect(() => {
    if (!data) return;
    if (method === "GET") {
      if (isPagination) {
        setFeedData((prev) => ({
          ...prev,
          results: [...prev.results, ...data.results],
        }));
      } else {
        setFeedData(data);
      }
      setNextUrl(data.next);
      setLoadingPage(false);
      setIsPagination(false);
    } else if (method === "POST") {
      setFeedData((prev) => ({
        ...prev,
        count: prev.count + 1,
        results: [data, ...prev.results],
      }));
      setLoadingPost(false);
    } else if (method === "PATCH") {
      setFeedData((prev) => ({
        ...prev,
        results: prev.results.map((p) => (p.id === data.id ? data : p)),
      }));
    }
  }, [data]);

  // get next posts
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingPage) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && nextUrl) {
            setIsPagination(true);
            setLoadingPage(true);
            httpConfig(nextUrl);
          }
        },
        {
          threshold: 1,
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [loadingPage, nextUrl],
  );

  // handles POST
  const handlePOST = (title: string, content: string) => {
    const body = {
      username: user,
      title: title,
      content: content,
    };
    httpConfig(api, "POST", body);
  };

  // handles DELETE
  const handleDELETE = (id: number) => {
    httpConfig(api + `${id}/`, "DELETE");
    const newData = { ...feedData };
    newData.count -= 1;
    newData.results = newData.results.filter((post) => post.id !== id);
    setFeedData((prev) => ({
      ...prev,
      count: prev.count - 1,
      results: prev.results.filter((post) => post.id !== id),
    }));
  };

  // handles PATCH
  const handlePATCH = (id: number, title: string, content: string) => {
    httpConfig(api + `${id}/`, "PATCH", { title, content });
  };

  if (user && user.replace(/\s/g, "") !== user) {
    return <Error404 />;
  }

  return (
    <>
      <div className="fixed top-0 right-0 z-50">
        <LogOutButton />
      </div>
      <div className="p-10">
        <div className="flex flex-col bg-card max-w-3xl m-auto rounded-lg">
          <div className="bg-blue-codeleap w-full rounded-t-lg flex justify-start items-center p-6">
            <h1 className="font-bold text-white">CodeLeap Network</h1>
          </div>
          <div className="w-full flex flex-col justify-center items-center p-6 gap-8">
            <PostForm
              handlePOST={handlePOST}
              loadingPost={loadingPost}
              setLoadingPost={setLoadingPost}
            />
            <div className="flex flex-col gap-8 items-center w-full">
              {feedData.results.map((post, key) => {
                if (key === feedData.results.length - 1) {
                  return (
                    <div
                      className="p-0 m-0 w-full"
                      ref={lastPostRef}
                      key={post.id}
                    >
                      <PostCard
                        {...post}
                        loggedUser={user || ""}
                        handleDELETE={handleDELETE}
                        handlePATCH={handlePATCH}
                      />
                    </div>
                  );
                }

                return (
                  <div className="p-0 m-0 w-full" key={post.id}>
                    <PostCard
                      {...post}
                      loggedUser={user || ""}
                      handleDELETE={handleDELETE}
                      handlePATCH={handlePATCH}
                    />
                  </div>
                );
              })}
            </div>
            {loadingPage && (
              <>
                <Spinner className="size-8" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
