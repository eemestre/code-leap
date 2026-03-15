import { useEffect, useState } from "react";

type Methods = "GET" | "POST" | "PATCH" | "DELETE";
interface Config {
  method: Methods;
  headers: { "Content-type": string };
  body: string;
}

export function useFetch(initialUrl: string) {
  const [config, setConfig] = useState<Config | undefined>();
  const [method, setMethod] = useState<Methods>("GET"); // initial values to run
  const [url, setUrl] = useState<string>(initialUrl); // a GET request on mount
  const [data, setData] = useState<any>(null); // data from last fetch

  /**
   * Configures the fetch configs.
   * The data from the last call is stored on the data state, and the
   * method for the las call is stored on the method state. When a new
   * call is made, it overwrites the old data and the old method. This
   * way, when the feed makes a httpConfig() call, the data and method
   * states changes, and when this happens, a useEffect on method catches
   * it and stores the data as needed and in different ways deppending
   * on the method used.
   */
  const httpConfig = (url: string, method: Methods = "GET", data: any = {}) => {
    if (method === "POST" || method === "PATCH" || method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    setMethod(method);
    setUrl(url);
  };

  useEffect(() => {
    const httpRequest = async () => {
      try {
        let res;
        if (method === "POST" || method === "PATCH") {
          res = await fetch(url, config);
          const result = await res.json();
          setData(result);
        } else if (method === "DELETE") {
          fetch(url, config);
          setData({});
        } else {
          res = await fetch(url);
          const result = await res.json();
          setData(result);
        }
        if (res && !res.ok) {
          const errorData = await res.json();
          setData(errorData);
          throw new Error(
            (errorData && errorData.message) || "Failed to fetch URL",
          );
        }
      } catch (err: any) {
        console.error("There was an error!", err.message);
      }
    };
    httpRequest();
  }, [url, config, method]);

  return {
    data,
    httpConfig,
    method,
  };
}
