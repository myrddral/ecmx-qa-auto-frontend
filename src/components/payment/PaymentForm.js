import React, {useEffect} from "react";
import { CardElement } from "@stripe/react-stripe-js";
import usePaymentForm from "./usePaymentForm";
import PaymentSuccess from "./PaymentSuccess";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import secureSSL from "../../assets/secure_ssl.png";
import poweredByStripe from "../../assets/poweredby-stripe-black.svg";
import Loader from "../Loader";

const PaymentForm = ({ amountToCharge }) => {
  const { handleSubmit, isSubmitting, paymentStatus, savedPaymentMethods, error } = usePaymentForm(amountToCharge);
  const { t } = useTranslation();

  useEffect(() => {
    if (savedPaymentMethods?.length > 0) {
      document.getElementById("overlay").style.display = "block";
    }
  }, [savedPaymentMethods]);

  const paymentForm = (
    <form className="payment-form" onSubmit={handleSubmit} style={{position: 'relative', zIndex: 1}}>
      <div id="overlay"></div>
      {/* <Loader /> */}
      <div className="form-header">
        <p className="form-header-title">{t("payment.title")}</p>
        <p>{t("payment.text")}</p>
        <p>
          <strong>{amountToCharge} EUR</strong>
        </p>
      </div>
      <CardElement className="" />
      <span className="error-message">{error && error.message}</span>
      <button
        type="submit"
        className={cx("button is-primary-darker", isSubmitting && "is-loading")}
        style={{ minWidth: 150 }}
      >
        {t("payment.pay")}
      </button>
      <div className="form-footer">
        <img className="stripe-logo" src={poweredByStripe} alt="payment-logo" />
        <img className="secure-payment-image" src={secureSSL} alt="secure-payment" />
      </div>
    </form>
  );

  return (
    <div className="container is-max-desktop">{paymentStatus === "pending" ? paymentForm : <PaymentSuccess />}</div>
  );
};

export default PaymentForm;
