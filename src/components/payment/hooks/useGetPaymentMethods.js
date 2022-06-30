import { useState, useEffect } from "react";
import { getApiUrl } from "../../../utils/helpers";

const useGetPaymentMethods = () => {
  const [savedPaymentMethods, setSavedPaymentMethods] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${getApiUrl()}/charge/credit-cards`, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const paymentMethod = await response.json();
          setSavedPaymentMethods(paymentMethod.data);
          return;
        }
        const httpException = await response.json();
        console.error(`Status: ${httpException.statusCode} - ${httpException.message}`);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    })();
  }, []);

  return { savedPaymentMethods, error };
};

export default useGetPaymentMethods;
