import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="section container">
        <header className="has-text-centered">
          <p className="has-text-weight-medium is-size-1" style={{ color: "#76d1b4" }}>
            {t("notfound.title1")}
          </p>
          <p className="is-size-5">{t("notfound.title2")}</p>
          <div className="level pt-5">
            <Link className="level-item" to={"/"}>
              <button className="button is-primary-darker" style={{ maxWidth: 200, margin: "auto" }}>
                {t("notfound.button")}
              </button>
            </Link>
          </div>
        </header>
      </section>
    </>
  );
};

export default NotFound;
