import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useStore from "../../store/useStore";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./stripe.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [amountToCharge, setAmountToCharge] = useState(0);

  // get package info from backend
  useEffect(() => {
    switch (searchParams.get("package")) {
      case "1":
        setAmountToCharge(100);
        break;
      case "2":
        setAmountToCharge(300);
        break;
      case "3":
        setAmountToCharge(1000);
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

  return <>{currentUser ? paymentElement : "This area is for registered users only"}</>;
};

export default Payment;
