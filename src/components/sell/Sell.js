import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Sell = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const [postCode, setPostCode] = useState("");
  const inputHelp = useRef();

  const handleClick = () => {
    if (postCode) {
      inputHelp.current.classList.add("is-invisible");
      navigate(`/${i18n.language}/sell/chooseinspector/${postCode}`);
    } else {
      inputHelp.current.classList.remove("is-invisible");
    }
  };

  const handleOnFocus = () => inputHelp.current.classList.add("is-invisible");

  const handleOnChange = (e) => setPostCode(e.target.value);

  return (
    <>
      <section className="section">
        <header className="block has-text-centered has-text-weight-medium is-size-1">{t("sellPage.title")}</header>
      </section>
      <section className="section">
        <div className="container is-max-desktop has-text-centered">
          <p className="block is-size-5">{t("sellPage.part1")}</p>
          <p className="block is-size-5">{t("sellPage.part2")}</p>
          <p className="block is-size-5">{t("sellPage.part3")}</p>
          <p className="block is-size-5">{t("sellPage.part4.1")} <strong>{t("sellPage.part4.price")}</strong>{t("sellPage.part4.2")}</p>
        </div>
      </section>
      <section className="section">
        <div className="columns has-text-centered is-desktop" style={{ maxWidth: 1000, margin: "auto" }}>
          <div className="column is-flex is-justify-content-center">
            <div className="box-darken container column-space-between">
              <div className="is-size-4 pb-4 has-text-weight-medium">{t("sellPage.card1.title")}</div>
              <div className="field is-horizontal">
                <div className="field-label is-small" style={{ flex: 4 }}>
                  <label className="label">{t("sellPage.card1.input.label")}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-small"
                        type="text"
                        placeholder=""
                        value={postCode}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        style={{ maxWidth: 200 }}
                      />
                    </div>
                    <p ref={inputHelp} className="help is-danger is-invisible">
                      {t("sellPage.card1.input.help")}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="button is-primary-darker"
                onClick={handleClick}
                style={{ width: 300, marginLeft: "auto", marginRight: "auto" }}
              >
                {t("sellPage.card1.button")}
              </button>
            </div>
          </div>
          <div className="column is-flex is-justify-content-center">
            <div className="box-darken column-space-between">
              <div className="is-size-4 pb-4 has-text-weight-medium">{t("sellPage.card2.title")}</div>
              <p className="block">{t("homepage.card2.text")}</p>
              <button className="button is-primary-darker" style={{ width: 300, margin: "auto" }}>
                <Link to={`${i18n.language}/sell`}>{t("sellPage.card2.button")}</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sell;
