import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const OffersArriving = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <section className="section">
        <div className="container is-max-desktop has-text-centered">
          <header className="block has-text-centered has-text-weight-medium is-size-1">
            {t("offersArriving.title")}
          </header>
          <p className="block is-size-5">{t("offersArriving.part1")}</p>
          <div className="buttons is-flex is-flex-direction-column">
            <Link className="block" to={`/${i18n.language}/buy`}>
              <button className="button is-primary-darker" style={{width: 250}}>{t("offersArriving.button1")}</button>
            </Link>
            <Link className="block" to={`/${i18n.language}`}>
              <button className="button is-primary-darker" style={{width: 250}}>{t("offersArriving.button2")}</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default OffersArriving;
