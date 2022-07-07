import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../../utils/helpers";
import { useParams } from "react-router-dom";

const ChooseInspector = () => {
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const params = useParams();
  const inspectors = useStore((state) => state.inspectors);
  const setInspectors = useStore((state) => state.setInspectors);
  const choosenInspector = useStore((state) => state.choosenInspector);
  const setChoosenInspector = useStore((state) => state.setChoosenInspector);

  useEffect(() => {
    (async () => {
      const fetchedInspectors = await fetch(`${getApiUrl()}/users/assessors/?zip=${params.postCode}`);
      const inspectorList = await fetchedInspectors.json();
      setInspectors(inspectorList);
    })();
  }, [params.postCode, setInspectors]);

  const handleOnClick = (inspector) => {
    setChoosenInspector(inspector);
  };

  const inspectorList = inspectors.map((inspector) => (
    <div key={inspector.ID} className="columns is-flex">
      <span id="inspector-name" className="column">
        {inspector.FIRST_NAME} {inspector.LAST_NAME}
      </span>
      <span id="inspector-company" className="column">
        {inspector.COMPANY.NAME}
      </span>
      <button className="button column is-primary-darker" onClick={() => handleOnClick(inspector)}>
        {t("chooseInspector.button")}
      </button>
    </div>
  ));

  const BeforeSelect = () => {
    return (
      <>
        <section className="section">
          <header className="block has-text-centered has-text-weight-medium is-size-1">
            {t("chooseInspector.title")}
          </header>
        </section>
        <section className="section pb-0">
          <div className="container is-max-desktop has-text-centered">
            <p className="block is-size-5">{t("chooseInspector.part1")}</p>
            <p className="block is-size-5">{t("chooseInspector.part2")}</p>
            <p className="block is-size-5 pt-6">{t("chooseInspector.part3")}</p>
          </div>
        </section>
        <section className="section">
          <div className="box-darken container is-max-desktop has-text-centered">
            {inspectorList}
          </div>
        </section>
      </>
    );
  };

  const AfterSelect = () => {
    const [name, setName] = useState("");
    const [postCode, setPostCode] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const nameRef = useRef();
    const postCodeRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const handleOnFocus = (inputTypeRef) => inputTypeRef.current.classList.add("is-invisible");
    const handleOnBlur = () => {};

    const validate = () => {
      const showHelp = (inputTypeRef) => inputTypeRef.current.classList.remove("is-invisible");

      if (!name) {
        showHelp(nameRef);
        setIsLoading("");
      }

      if (!postCode) {
        showHelp(postCodeRef);
        setIsLoading("");
      }

      if (!email) {
        showHelp(emailRef);
        setIsLoading("");
      }

      if (!phone) {
        showHelp(phoneRef);
        setIsLoading("");
      }
    };

    const handleSubmit = () => {
      setIsLoading("is-loading");
      validate();

      if (name && postCode && email && phone) {
        const dataToSubmit = {
          name: name.toString(),
          postCode: postCode.toString(),
          email: email.toString(),
          phone: phone.toString(),
        };
        console.log(dataToSubmit);
        setTimeout(() => {
          setIsLoading("");
          navigate(`/${i18n.language}/sell/emailsent`);
        }, 1000);
      }
    };

    return (
      <>
        <section className="section pb-0">
          <div className="container is-max-desktop has-text-centered">
            <header className="block has-text-centered has-text-weight-medium is-size-1">
              {t("chosenInspector.title")}
            </header>
            <p className="is-size-5">
              {t("chosenInspector.yourChoosenInspector")}{" "}
              <span className="has-text-weight-medium">{choosenInspector.name}</span>
            </p>
            <p className="block is-size-7">
              Mégsem őt szeretnéd?{" "}
              <span onClick={() => setChoosenInspector(null)} style={{ color: "blue", cursor: "pointer" }}>
                {" "}
                Vissza ↩
              </span>
            </p>
            <p className="block is-size-5">{t("chosenInspector.part1")}</p>
          </div>
        </section>
        <section className="section">
          <div className="box-darken container is-max-desktop has-text-centered" style={{ maxWidth: 400 }}>
            {/* NAME */}
            <div className="field is-horizontal">
              <div className="field-label is-small">
                <label className="label">{t("chosenInspector.details.name.input.label")}</label>
              </div>
              <div className="field-body" style={{ flex: 3 }}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-small"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => handleOnFocus(nameRef)}
                      onBlur={() => handleOnBlur(nameRef)}
                    />
                  </div>
                  <p ref={nameRef} className="help is-danger is-invisible">
                    {t("chosenInspector.details.name.input.help")}
                  </p>
                </div>
              </div>
            </div>
            {/* POSTCODE */}
            <div className="field is-horizontal">
              <div className="field-label is-small">
                <label className="label">{t("chosenInspector.details.postcode.input.label")}</label>
              </div>
              <div className="field-body" style={{ flex: 3 }}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-small"
                      type="text"
                      value={postCode}
                      onChange={(e) => setPostCode(e.target.value)}
                      onFocus={() => handleOnFocus(postCodeRef)}
                      onBlur={() => handleOnBlur(postCodeRef)}
                    />
                  </div>
                  <p ref={postCodeRef} className="help is-danger is-invisible">
                    {t("chosenInspector.details.postcode.input.help")}
                  </p>
                </div>
              </div>
            </div>
            {/* EMAIL */}
            <div className="field is-horizontal">
              <div className="field-label is-small">
                <label className="label">{t("chosenInspector.details.email.input.label")}</label>
              </div>
              <div className="field-body" style={{ flex: 3 }}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-small"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => handleOnFocus(emailRef)}
                      onBlur={() => handleOnBlur(emailRef)}
                    />
                  </div>
                  <p ref={emailRef} className="help is-danger is-invisible">
                    {t("chosenInspector.details.email.input.help")}
                  </p>
                </div>
              </div>
            </div>
            {/* PHONE */}
            <div className="field is-horizontal">
              <div className="field-label is-small">
                <label className="label">{t("chosenInspector.details.phone.input.label")}</label>
              </div>
              <div className="field-body" style={{ flex: 3 }}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-small"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={() => handleOnFocus(phoneRef)}
                      onBlur={() => handleOnBlur(phoneRef)}
                    />
                  </div>
                  <p ref={phoneRef} className="help is-danger is-invisible">
                    {t("chosenInspector.details.phone.input.help")}
                  </p>
                </div>
              </div>
            </div>
            <button className={`button ${isLoading}`} onClick={handleSubmit}>
              {t("chosenInspector.submitButton")}
            </button>
          </div>
        </section>
      </>
    );
  };

  return choosenInspector ? <AfterSelect /> : <BeforeSelect />;
};

export default ChooseInspector;
