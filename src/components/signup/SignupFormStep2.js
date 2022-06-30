import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

const SignupFormStep2 = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="field">
        <label className="is-size-7" htmlFor="addressType">
          {t("registration.addressType")}
        </label>
        <Field className="input is-small" name="addressType" type="text" />
        <ErrorMessage name="addressType">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="country">
          {t("registration.country")}
        </label>
        <Field className="input is-small" name="country" type="text" />
        <ErrorMessage name="country">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="city">
          {t("registration.city")}
        </label>
        <Field className="input is-small" name="city" type="text" />
        <ErrorMessage name="city">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="street">
          {t("registration.street")}
        </label>
        <Field className="input is-small" name="street" type="text" />
        <ErrorMessage name="street">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="houseNumber">
          {t("registration.houseNumber")}
        </label>
        <Field className="input is-small" name="houseNumber" type="text" />
        <ErrorMessage name="houseNumber">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="postcode">
          {t("registration.postcode")}
        </label>
        <Field className="input is-small" name="postcode" type="text" />
        <ErrorMessage name="postcode">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>
    </>
  );
};

export default SignupFormStep2;
