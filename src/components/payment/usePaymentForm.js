import { useState, useEffect } from "react";
// import { getApiUrl } from "../../utils/helpers";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useStore from "../../store/useStore";
import useGetPaymentMethods from "./hooks/useGetPaymentMethods";
import chargeCard from "./hooks/chargeCard";

function usePaymentForm(amountToCharge) {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useStore((state) => state.currentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const { savedPaymentMethods } = useGetPaymentMethods();

  // If there is a saved payment method (card), let's use that
  useEffect(() => {
    (async () => {
      if (savedPaymentMethods?.length > 0) {
        //TODO: handle multiple saved payment methods
        const paymentMethodId = savedPaymentMethods[0].id;
        try {
          setIsSubmitting(true);
          await chargeCard(currentUser, paymentMethodId, amountToCharge, setPaymentStatus);
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      }
    })();
  }, [savedPaymentMethods, amountToCharge, currentUser]);

  // If there is no saved payment method, continue with submitting
  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      console.log(error);
      setError(error);
      return;
    }

    const paymentMethodId = paymentMethod.id;

    await chargeCard(currentUser, paymentMethodId, amountToCharge, setPaymentStatus);

    setIsSubmitting(false);
  };

  return {
    handleSubmit,
    isSubmitting,
    paymentStatus,
    savedPaymentMethods,
    error
  };
}

export default usePaymentForm;
