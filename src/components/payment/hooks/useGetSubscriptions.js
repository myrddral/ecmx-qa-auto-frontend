import { useState, useEffect } from "react";
import { getApiUrl } from "../../../utils/helpers";

const useGetSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const authToken = localStorage.getItem("token");
      const response = await fetch(`${getApiUrl()}/subscriptions/monthly`, {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      });
      const responseObject = await response.json();

      if (response.ok) {
        setSubscriptions(responseObject);
      } else {
        setError(responseObject);
      }
    })();
  }, []);

  return { subscriptions, error };
};

export default useGetSubscriptions;
