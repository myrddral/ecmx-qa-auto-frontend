import useStore from "../../store/useStore";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import useGetPaymentMethods from "../payment/hooks/useGetPaymentMethods";
import useGetSubscriptions from "../payment/hooks/useGetSubscriptions";

const Profile = () => {
  const currentUser = useStore((state) => state.currentUser);
  const { savedPaymentMethods, error: getPaymentMethodError } = useGetPaymentMethods();
  const { subscriptions, error: getSubscriptionError } = useGetSubscriptions();
  const { t } = useTranslation();

  useEffect(() => {
    getPaymentMethodError && console.error(getPaymentMethodError);
    getSubscriptionError && console.error(getSubscriptionError);
  }, [getPaymentMethodError, getSubscriptionError]);

  const BaseInfo = () => {
    return (
      <>
        <header className="card-header">
          <p className="card-header-title">Alap adatok</p>
        </header>
        <div className="card-content">
          <p>
            <strong>Név: </strong>
            {/* TODO: send back full name upon login */}
            <span>{currentUser.firstname}</span>
          </p>
          <p>
            <strong>Email: </strong>
            <span>{currentUser.email}</span>
          </p>
          <p>
            <strong>Jogkör: </strong>
            <span>{t("roleCodes.role", { context: `${currentUser.rolecode}` })}</span>
          </p>
        </div>
      </>
    );
  };

  const CreditInfo = () => {
    return (
      <>
        <header className="card-header">
          <p className="card-header-title">Credit adatok</p>
        </header>
        <div className="card-content">
          <p>
            <strong>Credit: </strong>
            <span>{currentUser.credit}</span>
          </p>
        </div>
      </>
    );
  };

  const PaymentInfo = () => {
    const savedCard = savedPaymentMethods[0].card;
    return (
      <>
        <header className="card-header">
          <p className="card-header-title">Regisztrált bakkártyák</p>
        </header>
        <div className="card-content">
          <p>
            <strong>Típusa: </strong>
            {savedCard.brand}
          </p>
          <p>
            <strong>Száma: </strong>**** **** ****{savedCard.last4}
          </p>
          <p>
            <strong>Érvényessége: </strong>
            {savedCard.exp_year} / {savedCard.exp_month}
          </p>
        </div>
      </>
    );
  };

  const NoPaymentInfo = () => {
    return (
      <>
        <header className="card-header">
          <p className="card-header-title">Regisztrált bakkártyák</p>
        </header>
        <div className="card-content">Nincs elmentett fizetési mód</div>
      </>
    );
  };

  const SubscriptionInfo = () => {
    // const chosenCountry = localStorage.getItem("chosenCountry");
    //TODO: create a locales lookup table and replace hardcoded values
    const subStartDate = new Date(subscriptions.start_date).toLocaleDateString("hu-HU");
    const subscriptionPlan = subscriptions.plan;
    const monthlyRate = `${subscriptionPlan.amount / 100} ${subscriptionPlan.currency.toUpperCase()}`;
    const productId = subscriptionPlan.product;

    return (
      <>
        <header className="card-header">
          <p className="card-header-title">Előfizetések</p>
        </header>
        <div className="card-content">
          <p>
            <strong>Státusz: </strong>
            {subscriptions.status}
          </p>
          <p>
            <strong>Azonosító: </strong>
            {subscriptions.id}
          </p>
          <p>
            <strong>Kezdő dátum: </strong>
            {subStartDate}
          </p>
          <p>
            <strong>Havidíj: </strong>
            {monthlyRate}
          </p>
          <p>
            <strong>Termék azonosítója: </strong>
            {productId}
          </p>
        </div>
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
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container is-max-desktop">
          {currentUser && (
            <>
              <div className="tile is-ancestor">
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <BaseInfo />
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    <CreditInfo />
                  </article>
                </div>
              </div>

              <div className="tile is-ancestor">
                <div className="tile is-parent">
                  <article className="tile is-child box">
                    {savedPaymentMethods ? <PaymentInfo /> : <NoPaymentInfo />}
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box">{subscriptions && <SubscriptionInfo />}</article>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
