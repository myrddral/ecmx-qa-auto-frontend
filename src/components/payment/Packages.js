import "bulma-pricingtable/dist/css/bulma-pricingtable.min.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Packages = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <section className="section">
        <div className="container is-max-desktop has-text-centered">
          <header className="block has-text-centered has-text-weight-medium is-size-1">
            {t("subscription.title")}
          </header>
          {/* <p className="block is-size-5">{t("buyPage.part1")}</p> */}
        </div>
      </section>
      <div className="pricing-table pl-6 pr-6">
        <div className="pricing-plan is-warning zoom-on-hover">
          <div className="plan-header">Alap</div>
          <div className="plan-price">
            <span className="plan-price-amount">
              <span className="plan-price-currency">€</span>100
            </span>
            {/* /month */}
          </div>
          <div className="plan-items">
            <div className="plan-item">10 db felmérésre elegendő kredit</div>
            {/* <div className="plan-item">25 Domains</div>
            <div className="plan-item">1TB Bandwidth</div>
            <div className="plan-item">-</div> */}
          </div>
          <div className="plan-footer">
            <Link to={`/${i18n.language}/packages/payment?package=1`}>
              <button className="button is-fullwidth">{t("subscription.chooseButton")}</button>
            </Link>
          </div>
        </div>

        <div className="pricing-plan is-info zoom-on-hover">
          <div className="plan-header">Extra</div>
          <div className="plan-price">
            <span className="plan-price-amount">
              <span className="plan-price-currency">€</span>300
            </span>
            {/* /month */}
          </div>
          <div className="plan-items">
            <div className="plan-item">35 db felmérésre elegendő kredit</div>
            {/* <div className="plan-item">50 Domains</div>
            <div className="plan-item">1TB Bandwidth</div>
            <div className="plan-item">100 Email Boxes</div> */}
          </div>
          <div className="plan-footer">
            <Link to={`/${i18n.language}/packages/payment?package=2`}>
              <button className="button is-fullwidth">{t("subscription.chooseButton")}</button>
            </Link>
          </div>
        </div>

        <div className="pricing-plan is-success zoom-on-hover">
          <div className="plan-header">Korlátlan</div>
          <div className="plan-price">
            <span className="plan-price-amount">
              <span className="plan-price-currency">€</span>1000
            </span>
            /hó
          </div>
          <div className="plan-items">
            <div className="plan-item">Korlátlan felmérés</div>
            {/* <div className="plan-item">100 Domains</div>
            <div className="plan-item">1TB Bandwidth</div>
            <div className="plan-item">1000 Email Boxes</div> */}
          </div>
          <div className="plan-footer">
            <Link to={`/${i18n.language}/packages/payment?package=3`}>
              <button className="button is-fullwidth">{t("subscription.chooseButton")}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;
