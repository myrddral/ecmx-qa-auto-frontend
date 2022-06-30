import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

const SignupFormStep1 = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="field">
        <label className="is-size-7" htmlFor="firstName">
          {t("registration.firstName")}
        </label>
        <Field className="input is-small" name="firstName" type="text" />
        <ErrorMessage name="firstName">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="lastName">
          {t("registration.lastName")}
        </label>
        <Field className="input is-small" name="lastName" type="text" />
        <ErrorMessage name="lastName">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="email">
          {t("registration.email")}
        </label>
        <Field className="input is-small" name="email" type="email" />
        <ErrorMessage name="email">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="phone">
          {t("registration.phone")}
        </label>
        <Field className="input is-small" name="phone" type="text" />
        <ErrorMessage name="phone">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>
    </>
  );
};

export default SignupFormStep1;
