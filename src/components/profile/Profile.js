import useStore from "../../store/useStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useGetPaymentMethods from "../payment/hooks/useGetPaymentMethods";

const Profile = () => {
  const currentUser = useStore((state) => state.currentUser);
  const { savedPaymentMethods, error } = useGetPaymentMethods();
  const { t } = useTranslation();

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  const BaseInfo = () => {
    return (
      <>
        <div className="card box">
          <header className="card-header">
            <p className="card-header-title">Alap adatok</p>
          </header>
          <div className="card-content">
            <p>
              <strong>Email: </strong>
              <span>{currentUser.email}</span>
            </p>
            <p>
              <strong>Jogkör: </strong>
              <span>{t("roleCodes.role", { context: `${currentUser.rolecode}` })}</span>
            </p>
          </div>
        </div>
      </>
    );
  };

  const CreditInfo = () => {
    return (
      <>
        <div className="card box">
          <header className="card-header">
            <p className="card-header-title">Credit adatok</p>
          </header>
          <div className="card-content">
            <p>
              <strong>Credit: </strong>
              <span>{currentUser.credit}</span>
            </p>
          </div>
        </div>
      </>
    );
  };

  const StripeInfo = () => {
    return (
      <>
        {savedPaymentMethods && (
          <div className="card box">
            <header className="card-header">
              <p className="card-header-title">Regisztrált bakkártyák</p>
            </header>
            <div className="card-content">
              <p>
                <strong>Típusa: </strong>
                {savedPaymentMethods && savedPaymentMethods[0].card.brand}
              </p>
              <p>
                <strong>Száma: </strong>**** **** ****{savedPaymentMethods && savedPaymentMethods[0].card.last4}
              </p>
              <p>
                <strong>Érvényessége: </strong>
                {savedPaymentMethods && savedPaymentMethods[0].card.exp_year} / {savedPaymentMethods[0].card.exp_month}
              </p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <section className="section">
        <div className="container is-max-desktop has-text-centered">
          <header className="block has-text-centered has-text-weight-medium is-size-1">{t("profile.title")}</header>
        </div>
      </section>
      <section className="section">
        {currentUser && (
          <>
            <BaseInfo />
            <CreditInfo />
            <StripeInfo />
          </>
        )}
      </section>
    </>
  );
};

export default Profile;
