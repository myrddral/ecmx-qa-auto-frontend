import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import huFlag from "../../assets/flags/hu.png";
import enFlag from "../../assets/flags/en.png";
import { Dropdown, Icon } from "react-bulma-components";

//TODO: get current path inserted for language switcher

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const languages = {
    hu: { nativeName: "Magyar", flag: huFlag },
    en: { nativeName: "English", flag: enFlag },
  };

  return (
    <>
      <Dropdown
        closeOnSelect={true}
        color=""
        right={true}
        icon={
          <Icon>
            <i aria-hidden="true" className="fas fa-angle-down" />
          </Icon>
        }
        label={t("languageSelectorButtonText")}
        style={{padding: "none"}}
      >
        {Object.keys(languages).map((lng) => (
          <Dropdown.Item key={lng} value={languages[lng].nativeName}>
            <Link to={`/${lng}`} onClick={() => i18n.changeLanguage(lng)} className="dropdown-item">
              {/* {<img src={languages[lng].flag} alt="flag" />} {languages[lng].nativeName} */}
              {languages[lng].nativeName}
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </>
  );
};

export default LanguageSelector;
