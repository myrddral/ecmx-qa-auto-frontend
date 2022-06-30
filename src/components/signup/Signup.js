import { useState } from "react";
import { useTranslation } from "react-i18next";
import SignupForm from "./SignupForm.js";
import SignupWizard from "./SignupWizard.js";

const Signup = () => {
  const { t } = useTranslation();
  const [signupType, setSignupType] = useState();

  const SignupTypeChooser = () => {
    return (
      <>
        <section className="section">
          <div className="columns has-text-centered is-desktop" style={{ maxWidth: 1000, margin: "auto" }}>
            <div className="column is-flex is-justify-content-center">
              <div
                className="highlight-on-hover box-darken column-space-between"
                style={{ cursor: "pointer" }}
                onClick={() => setSignupType("personal")}
              >
                <div className="is-size-4 pb-4">Magánszemélyként regisztrálok</div>
              </div>
            </div>
            <div className="column is-flex is-justify-content-center">
              <div
                className="highlight-on-hover box-darken column-space-between"
                style={{ cursor: "pointer" }}
                onClick={() => setSignupType("company")}
              >
                <div className="is-size-4 pb-4">Cégként / vállalkozóként regisztrálok</div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <section className="section">
        <header className="block has-text-centered has-text-weight-medium is-size-3">{t("registration.title")}</header>
      </section>

      <section className="section container is-flex">
        {!signupType ? (
          <SignupTypeChooser />
        ) : (
          <div className="box-darken">
            <SignupForm signupType={signupType} />
            {/* <SignupWizard /> */}
          </div>
        )}
      </section>
    </>
  );
};

export default Signup;
