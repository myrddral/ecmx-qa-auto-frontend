import { getApiUrl } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Success from "./signup/Success";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isTokenGenerated, setIsTokenGenerated] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    
  }, []);

  const EmailInputField = () => {
    const [email, setEmail] = useState();

    useEffect(() => {
      if (token) verifyToken(token);
      // automatic api call to pass token to backend to validate user for password change
      async function verifyToken(token) {
        console.log('verifying token...')
        const response = await fetch(`${getApiUrl()}/users/password-reset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, email: email }),
        });

        if (!response.ok) console.log(response);
        console.log('token is valid')
        setIsTokenValid(true);
      }
    }, [email]);

    const handleEmailSubmit = async () => {
      // manual api call to get a verification token email
      const response = await fetch(`${getApiUrl()}/users/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) setIsTokenGenerated(true);
    };

    return (
      <section className="section">
        <header className="has-text-centered has-text-weight-medium is-size-4 is-flex is-flex-direction-column is-align-items-center">
          <p className="mb-4">Jelszó visszaállítása</p>
          <input
            className="input is-primary"
            type="email"
            placeholder="Kérlek, add meg az email címed"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: 400 }}
          />
          <button
            className="m-4 button is-primary-darker is-align-self-center"
            onClick={handleEmailSubmit}
            style={{ width: 200 }}
          >
            Tovább
          </button>
        </header>
      </section>
    );
  };

  const PasswordInputFields = () => {
    const [password, setPassword] = useState();
    const [passwordConf, setPasswordConf] = useState();

    const handlePasswordSubmit = async () => {
      // manual api call to send password for update
      const response = await fetch(`${getApiUrl()}/users/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, password: password }),
      });

      if (response.ok) setIsPasswordChanged(true);
    };

    return (
      <>
        <section className="section">
          <header className="has-text-centered has-text-weight-medium is-size-4 is-flex is-flex-direction-column is-align-items-center">
            <p className="mb-4">Add meg az új jelszavad</p>
            <input
              className="input is-primary"
              type="password"
              placeholder="Jelszó"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: 400 }}
            />
            <input
              className="input is-primary"
              type="password"
              placeholder="Jelszó ismét"
              onChange={(e) => setPasswordConf(e.target.value)}
              style={{ width: 400 }}
            />
            <button
              className="m-4 button is-primary-darker is-align-self-center"
              onClick={handlePasswordSubmit}
              style={{ width: 200 }}
            >
              Tovább
            </button>
          </header>
        </section>
      </>
    );
  };

  return (
    <>
      {!token && !isTokenGenerated && <EmailInputField />}

      {isTokenGenerated && <Success useCase={"passwordReset"} />}

      {token && isTokenValid && !isTokenGenerated && <PasswordInputFields />}

      {isPasswordChanged && <Success useCase={"passwordResetSuccess"} />}
    </>
  );
};

export default PasswordReset;
