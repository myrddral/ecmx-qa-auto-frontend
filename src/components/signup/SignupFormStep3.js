import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

const SignupFormStep3 = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="field">
        <label className="is-size-7" htmlFor="password">
          {t("registration.password")}
        </label>
        <Field className="input is-small" name="password" type="password" />
        <ErrorMessage name="password">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>

      <div className="field">
        <label className="is-size-7" htmlFor="passwordConf">
          {t("registration.passwordConf")}
        </label>
        <Field className="input is-small" name="passwordConf" type="password" />
        <ErrorMessage name="passwordConf">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
      </div>
    </>
  );
};

export default SignupFormStep3;
