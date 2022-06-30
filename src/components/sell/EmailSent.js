import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const EmailSent = () => {
  const { t, i18n } = useTranslation();

  // 1. visszaigazoló mail
  // 2. mennyi időn belül válaszolunk

  return (
    <>
      <section className="section">
        <div className="container is-max-desktop has-text-centered">
          <header className="block has-text-centered has-text-weight-medium is-size-1">{t("offersArriving.title")}</header>
          <p className="block is-size-5">{t("offersArriving.part1")}</p>
          <Link to={`/${i18n.language}`}>
          <button className="button is-primary-darker">{t("offersArriving.button1")}</button>
          </Link>
          <Link to={`/${i18n.language}`}>
          <button className="button is-primary-darker">{t("offersArriving.button2")}</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default EmailSent;
