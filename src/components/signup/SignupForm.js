import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { useState } from "react";
import useStore from "../../store/useStore";
import { getApiUrl } from "../../utils/helpers";
// import SignupFormStep1 from "./SignupFormStep1";
// import SignupFormStep2 from "./SignupFormStep2";
// import SignupFormStep3 from "./SignupFormStep3";

const SignupForm = () => {
  const { t } = useTranslation();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const currentUser = useStore((state) => state.currentUser);
  const [isSubMitting, setIsSubmitting] = useState(false);

  // function renderStepContent(step) {
  //   switch (step) {
  //     case 0:
  //       return <SignupFormStep1 />;
  //     case 1:
  //       return <SignupFormStep2 />;
  //     case 2:
  //       return <SignupFormStep3 />;
  //     default:
  //       return <div>Not Found</div>;
  //   }
  // }

  const handleSubmit = async (postData) => {
    const response = await fetch(`${getApiUrl()}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const received = await response.json();

    const showErrorMessage = () => console.error(`${received.message}`);
    const showSuccessMessage = async () => {
      alert("Sikeres regisztráció");
      // localStorage.setItem('userToConfirm', received.email);
      // const userSaved = await setCurrentUser(received);
      console.log(received);
    };

    response.ok ? showSuccessMessage(received) : showErrorMessage(received);

    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        // addressType: "",
        // countryCode: "",
        // city: "",
        // street: "",
        // houseNumber: "",
        // postcode: "",
        password: "",
        passwordConf: "",
        roleId: "USER",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(15, "Must be 15 characters or less").required(t("form.errors.firstNameMissing")),
        lastName: Yup.string().max(20, "Must be 20 characters or less").required(t("form.errors.lastNameMissing")),
        email: Yup.string().email(t("form.errors.invalidEmail")).required(t("form.errors.emailMissing")),
        phone: Yup.string().max(15, "Must be 15 characters or less").required(t("form.errors.phoneMissing")),
        password: Yup.string().required(t("form.errors.passwordMissing")),
        passwordConf: Yup.string()
          .required(t("form.errors.passwordMissing"))
          .oneOf([Yup.ref("password"), null], t("form.errors.passwordNotMatch")),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setIsSubmitting(true);
        handleSubmit({ ...values });
      }}
    >
      <Form>
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

        {/* ***************************************************************** */}

        {/* <div className="field">
          <label className="is-size-7" htmlFor="addressType">
            {t("registration.addressType")}
          </label>
          <Field className="input is-small" name="addressType" type="text" />
          <ErrorMessage name="addressType">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
        </div>

        <div className="field">
          <label className="is-size-7" htmlFor="countryCode">
            {t("registration.country")}
          </label>
          <Field className="input is-small" name="countryCode" type="text" />
          <ErrorMessage name="countryCode">{(msg) => <p className="help is-danger">{msg}</p>}</ErrorMessage>
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
        </div> */}

        {/* ****************************************************************** */}

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

        <div className="field">
          <div className="control is-flex is-justify-content-center">
            <button
              className={cx("button is-primary-darker", {
                "is-loading": isSubMitting,
              })}
              type="submit"
            >
              {t("registration.button")}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default SignupForm;
