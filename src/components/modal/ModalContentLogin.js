import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import useStore from "../../store/useStore";
import cx from "classnames";
import { useState } from "react";
import { getApiUrl } from "../../utils/helpers";

const ModalContentLogin = ({ setIsOpen }) => {
  const { t } = useTranslation();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = t("form.errors.emailMissing");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = t("form.errors.invalidEmail");
    }

    if (!values.password) {
      errors.password = t("form.errors.passwordMissing");
    } else if (values.password.length > 15) {
      errors.password = "Must be 15 characters or less";
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    const response = await fetch(`${getApiUrl()}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const user = await response.json();
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    localStorage.setItem("token", response.headers.get("Authorization"));
    setIsSubmitting(false);
    setIsOpen(false);
  };
  
  const LoginForm = () => {
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate,
      onSubmit: handleSubmit,
    });
    return (
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="is-size-7">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={cx("input", {
                "is-danger": false, //TODO: should replace with variable name
              })}
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className="help is-danger">{formik.errors.email}</p>
          ) : (
            <p className="help is-invisible">placeholder</p>
          )}
        </div>

        <div className="field">
          <label className="is-size-7">Password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className={cx("input", {
                "is-danger": false, //TODO: should replace with variable name
              })}
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key"></i>
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="help is-danger">{formik.errors.password}</p>
          ) : (
            <p className="help is-invisible">placeholder</p>
          )}
        </div>

        <div className="field">
          <div className="control is-flex is-justify-content-center">
            <button
              className={cx("button is-primary-darker mb-3", {
                "is-loading": isSubmitting,
              })}
              type="submit"
            >
              {t("login.button")}
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="container modal-container" style={{ height: "100%" }}>
        <p className="block modal-title has-text-centered">{t("login.title")}</p>
        <LoginForm />
      </div>
    </>
  );
};

export default ModalContentLogin;
