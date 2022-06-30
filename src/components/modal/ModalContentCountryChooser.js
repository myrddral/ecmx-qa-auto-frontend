import { useTranslation } from "react-i18next";
import supportedCountries from "../../internalization/supportedCountries";

const ModalContentCountryChooser = ({ setIsOpen }) => {
  const { t, i18n } = useTranslation();
  const countries = supportedCountries();

  const countryList = countries.map((country) => (
    <button
      onClick={() => i18n.changeLanguage(country.shortName)}
      className="button country-button m-1"
      key={country.shortName}
    >
      <span className="icon is-small has-text-weight-medium">
        <img className="country-chooser-modal-flag" src={country.flag} alt="flag" />
        {country.nativeName}
      </span>
    </button>
  ));

  const saveCountryToLocalStorage = () => {
    localStorage.setItem("chosenCountry", `${i18n.language}`);
    setIsOpen(false);
  };

  return (
    <>
      <div className="container modal-container" style={{ height: "100%" }}>
        <p className="modal-title block has-text-centered">{t("modal.countryChooser.title")}</p>
        <section className="block country-buttons">
          <div className="is-flex is-justify-content-center is-flex-wrap-wrap">{countryList}</div>
        </section>
        <button onClick={saveCountryToLocalStorage} className="button is-primary-darker confirm-button">
          {t("modal.countryChooser.confirmButton")}
        </button>
      </div>
    </>
  );
};

export default ModalContentCountryChooser;
