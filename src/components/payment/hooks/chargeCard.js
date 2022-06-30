import { getApiUrl } from "../../../utils/helpers";
import verifyPaymentAndAddCreditToUser from "../addCreditToUser";

const chargeCard = async (currentUser, paymentMethodId, amountToCharge, setPaymentStatus) => {
  const authToken = localStorage.getItem("token");
  
  try {
    const response = await fetch(`${getApiUrl()}/charge`, {
      method: "POST",
      body: JSON.stringify({
        paymentMethodId,
        amount: amountToCharge * 100, // expects amount this way (50 eur -> 5000)
        isCardSaved: false,
      }),
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });

    const responseObject = await response.json();

    if (response.ok) {
      const paymentId = responseObject.id;
      const amountReceived = responseObject.amount_received;

      const status = await verifyPaymentAndAddCreditToUser(paymentId, amountReceived, currentUser.id);

      if (status === "completed") setPaymentStatus("succeeded");
    } else {
      console.log(responseObject);
    }
  } catch (error) {
    console.log(error);
  }
};

export default chargeCard;
