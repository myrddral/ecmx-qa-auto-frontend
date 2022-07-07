import tickMark from "../../assets/tick_mark.png";
import { useTranslation } from "react-i18next";

const SubscriptionSuccess = () => {
  const { t } = useTranslation();

    return (
        <div className="payment-success is-flex is-justify-content-center">
          <p className="is-size-3 is-size-4-mobile">{t("subscription.success")}</p>
          <img className="pt-6" src={tickMark} width={150} alt="tick-mark" />
        </div>
      );
}
 
export default SubscriptionSuccess;