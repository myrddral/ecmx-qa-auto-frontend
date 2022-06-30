import { getApiUrl } from "../../utils/helpers";

export default async function verifyPaymentAndAddCreditToUser(id, amountReceivedByStripe, userId) {
  const authToken = localStorage.getItem("token");
  
  try {
    const response = await fetch(`${getApiUrl()}/users/${userId}/credits`, {
      method: "PATCH",
      body: JSON.stringify({
        paymentIntentId: id,
        amountReceivedByStripe: amountReceivedByStripe,
      }),
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);

    return result.status;
  } catch (error) {
    console.error(error);
  }
}
