import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useStore from "../../store/useStore";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getApiUrl } from "../../utils/helpers";
import "./stripe.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const createSubscription = async () => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await fetch(`${getApiUrl()}/subscriptions/monthly`, {
      method: "POST",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });
    const responseObject = await response.json();
    console.log(responseObject);
    if (response.ok) {
      // const status = await verifyPaymentAndAddCreditToUser(paymentId, amountReceived, currentUser.id);
      // if (status === "completed") setPaymentStatus("succeeded");
    } else {
      console.log(responseObject);
    }
  } catch (error) {
    console.log(error);
  }
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [amountToCharge, setAmountToCharge] = useState(0);

  // get package info from backend
  useEffect(() => {
    switch (searchParams.get("packages")) {
      case "1":
        setAmountToCharge(100);
        break;
      case "2":
        setAmountToCharge(300);
        break;
      case "3":
        createSubscription();
        break;

      default:
        break;
    }
  }, [searchParams]);

  const currentUser = useStore((state) => state.currentUser);
  const locale = localStorage.getItem("i18nextLng");

  const paymentElement = (
    <Elements options={{ locale: locale }} stripe={stripePromise}>
      <PaymentForm amountToCharge={amountToCharge} />
    </Elements>
  );

  return <>{currentUser ? amountToCharge !== 0 && paymentElement : "This area is for registered users only"}</>;
};

export default Payment;
