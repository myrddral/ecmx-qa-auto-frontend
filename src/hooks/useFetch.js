import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    error && toast.error(error.toString());
  }, [error]);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    (async () => {
      try {
        const response = await fetch(url, { headers: headers });
        const parsedResponse = await response.json();
        setData(parsedResponse);
      } catch (err) {
        setError(err);
      }
    })();
  }, [url]);

  return data;
};

export default useFetch;
