import huFlag from "../assets/flags/hu.png";
import enFlag from "../assets/flags/en.png";
import itFlag from "../assets/flags/it.png";
import deFlag from "../assets/flags/de.png";
import atFlag from "../assets/flags/at.png";


const supportedCountries = () => {
  const countries = [
    { shortName: "hu", nativeName: "Magyarország", flag: huFlag, hasTranslation: true },
    { shortName: "en", nativeName: "United Kingdom", flag: enFlag, hasTranslation: true },
    { shortName: "de", nativeName: "Deutschland", flag: deFlag, hasTranslation: false },
    { shortName: "it", nativeName: "Italia", flag: itFlag, hasTranslation: false },
    { shortName: "at", nativeName: "Österreich", flag: atFlag, hasTranslation: false },
  ];

  return countries;
};

export default supportedCountries;
