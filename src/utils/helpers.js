import supportedCountries from "../internalization/supportedCountries";

export function isDevMode() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? true : false;
}

export function getStartDateForBulmaCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${year}.${month}.${day}`;
}

export function isJsonResponse(response) {
  return response.headers.get("content-type").includes("json");
}

export function isValidLogJson(json) {
  return json[0].hasOwnProperty("message");
}

export function getApiUrl() {
  let url = "";

  isDevMode() ? (url = `http://${process.env.REACT_APP_DEV_API_URL}`) : (url = "");
  return url;
}

export function getBaseRouteUrl() {
  let baseUrl = "";
  let pathname = window.location.pathname;
  pathname = pathname.substring(1);
  supportedCountries.forEach((country) => {
    if (country.shortName === pathname) {
      baseUrl = ":locale";
    } else {
      baseUrl = "en";
    }
  });
  return baseUrl;
}
