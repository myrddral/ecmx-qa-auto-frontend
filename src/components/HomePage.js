import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.querySelector(".content-area").classList.add("is-justify-content-space-between");
    return () => {
      document.querySelector(".content-area").classList.remove("is-justify-content-space-between");
    };
  }, []);

  return (
    <>
      <section className="intro section pt-0" style={{ height: "100%", minHeight: 260, color: "white" }}>
        <header
          className="is-flex is-flex-direction-column is-justify-content-center is-desktop has-text-right pl-3 pr-3"
          style={{ height: "100%" }}
        >
          <p className="block is-size-3 is-size-4-mobile has-text-weight-bold">{t("homepage.welcome.part1")}</p>
          <p className="block is-size-5 is-hidden-touch" style={{ fontWeight: 400, paddingLeft: "70%" }}>
            {" "}
            {t("homepage.welcome.part2")}
          </p>
          <Link to={`/${i18n.language}/buy`}>
            <button className="button is-dark is-hidden-mobile" style={{ width: 200 }}>
              {t("homepage.welcome.button")}
            </button>
          </Link>
        </header>
      </section>
      <section className="section pt-0">
        <div className="columns has-text-centered is-desktop" style={{ margin: "auto" }}>
          <div className="column pt-0 is-flex is-justify-content-center">
            <div className="highlight-on-hover box-darken column-space-between p-6">
              <div className="is-size-5 pb-4 has-text-weight-bold">{t("homepage.card1.title")}</div>
              <p className="block">{t("homepage.card1.text")}</p>
              <Link to={`/${i18n.language}/buy`}>
                <button className="button is-primary-darker is-fullwidth">{t("homepage.card1.button")}</button>
              </Link>
            </div>
          </div>
          <div className="column pt-0 is-flex is-justify-content-center">
            <div className="highlight-on-hover box-darken column-space-between p-6">
              <div className="is-size-5 pb-4 has-text-weight-bold">{t("homepage.card2.title")}</div>
              <p className="block">{t("homepage.card2.text")}</p>
              <Link to={`/${i18n.language}/sell`}>
                <button className="button is-primary-darker is-fullwidth">{t("homepage.card2.button")}</button>
              </Link>
            </div>
          </div>
          <div className="column pt-0 is-flex is-justify-content-center">
            <div className="highlight-on-hover box-darken column-space-between p-6">
              <div className="is-size-5 pb-4 has-text-weight-bold">{t("homepage.card3.title")}</div>
              <p className="block">{t("homepage.card3.text")}</p>
              <Link to={`/${i18n.language}/join`}>
                <button className="button is-primary-darker is-fullwidth">{t("homepage.card3.button")}</button>
              </Link>
            </div>
          </div>
          <div className="column pt-0 is-flex is-justify-content-center">
            <div className="highlight-on-hover box-darken column-space-between p-6">
              <div className="is-size-5 pb-4 has-text-weight-bold">{t("homepage.card4.title")}</div>
              <p className="block">{t("homepage.card4.text")}</p>
              <Link to={`/${i18n.language}/support`}>
                <button className="button is-primary-darker is-fullwidth">{t("homepage.card4.button")}</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
