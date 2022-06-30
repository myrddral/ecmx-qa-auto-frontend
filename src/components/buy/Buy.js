import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Buy = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const [postCode, setPostCode] = useState("");
  const [carMake, setCarMake] = useState("");
  const inputHelp = useRef();

  const handleSearchClick = () => {
    if (carMake) {
    //   inputHelp.current.classList.add("is-invisible");
    } else {
    //   inputHelp.current.classList.remove("is-invisible");
    }
    navigate(`/${i18n.language}/buy/offers`);
  };

  const handleOnFocus = () => inputHelp.current.classList.add("is-invisible");

  const handleSelectChange = (e) => console.log(e.target.value);

  return (
    <>
      <section className="section">
        <div className="container is-max-desktop has-text-centered">
          <header className="block has-text-centered has-text-weight-medium is-size-1">{t("buyPage.title")}</header>
          <p className="block is-size-5">{t("buyPage.part1")}</p>
          <p className="block is-size-5">{t("buyPage.part2")}</p>
          <p className="block is-size-5">{t("buyPage.part3")}</p>
        </div>
      </section>
      <section className="section">
        <div className="columns has-text-centered is-desktop" style={{ maxWidth: 1000, margin: "auto" }}>
          <div className="column is-flex">
            <div className="box-darken container column-space-between" style={{ width: "100%" }}>
              <div className="is-size-4 pb-4 has-text-weight-medium">{t("buyPage.card1.title")}</div>
              <div className="field is-horizontal">
                <div className="field-label is-small" style={{ flex: 2 }}>
                  <label className="label">{t("buyPage.card1.input1.label")}</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-small">
                        <select onChange={handleSelectChange} onFocus={handleOnFocus} style={{ minWidth: 200 }}>
                          <option>Válassz...</option>
                          <option value="1">BMW</option>
                          <option value="2">Daewoo</option>
                          <option value="3">Ford</option>
                          <option value="4">Holden</option>
                          <option value="5">Honda</option>
                          <option value="6">Hyundai</option>
                          <option value="7">Isuzu</option>
                          <option value="8">Kia</option>
                          <option value="9">Lexus</option>
                          <option value="10">Mazda</option>
                          <option value="11">Mitsubishi</option>
                          <option value="12">Nissan</option>
                          <option value="13">Peugeot</option>
                          <option value="14">Subaru</option>
                          <option value="15">Suzuki</option>
                          <option value="16">Toyota</option>
                          <option value="17">Volkswagen</option>
                        </select>
                      </div>
                    </div>
                    <p ref={inputHelp} className="help is-danger is-invisible">
                      {t("buyPage.card1.input.help")}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="button is-primary-darker"
                onClick={handleSearchClick}
                style={{ width: 300, marginLeft: "auto", marginRight: "auto" }}
              >
                {t("buyPage.card1.button")}
              </button>
            </div>
          </div>
          <div className="column is-flex">
            <div className="box-darken column-space-between" style={{ width: "100%" }}>
              <div className="is-size-4 pb-4 has-text-weight-medium">{t("buyPage.card2.title")}</div>
              <p className="block">{t("buyPage.card2.text")}</p>
              <button
                className="button is-primary-darker"
                onClick={handleSearchClick}
                style={{ width: 300, marginLeft: "auto", marginRight: "auto" }}
              >
                {t("buyPage.card2.button")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Buy;
