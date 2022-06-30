  // This saves the payment method for later payments
    // try {
    //   const response = await fetch(`${getApiUrl()}/charge/credit-cards`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       paymentMethodId,
    //     }),
    //     headers: {
    //       Authorization: authToken,
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   const responseJson = await response.json();

    //   console.log(responseJson);

    //   const clientSecret = responseJson.client_secret;

    //   const confirm = await stripe?.confirmCardSetup(clientSecret);

    //   console.log(confirm);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsSubmitting(false);
    // }