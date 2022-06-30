import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useStore from "../store/useStore";
import Success from "./signup/Success";
import { getApiUrl } from "../utils/helpers";

const ConfirmAccount = () => {
  const currentUser = useStore((state) => state.currentUser);
  const [serverResponse, setServerResponse] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      // api call to confirm account
      const token = searchParams.get("token");
      const email = localStorage.getItem("userToConfirm");

      if (searchParams.entries.length > 0) {
        const response = await fetch(`${getApiUrl()}/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, email: email }),
        });

        !serverResponse && setServerResponse(await response.json());
        if (serverResponse?.confirmed === true) setIsConfirmed(true);
      }
    })();
  }, [searchParams, serverResponse]);

  const Failure = ({ message }) => {
    return (
      <section className="section">
        <header className="has-text-centered has-text-weight-medium is-size-4 is-flex is-flex-direction-column">
          <p className="mb-4">{message}</p>
          {/* <button
            className="m-4 button is-primary-darker is-align-self-center"
            onClick={verifyToken}
            style={{ width: 200 }}
          >
            Confirm
          </button> */}
        </header>
      </section>
    );
  };

  // const ConfirmComponent = () => {
  //   return (
  //     <section className="section">
  //       <header className="has-text-centered has-text-weight-medium is-size-4 is-flex is-flex-direction-column">
  //         <p className="mb-4">Please confirm your account by clicking on the button below</p>
  //         <button
  //           className="m-4 button is-primary-darker is-align-self-center"
  //           onClick={verifyToken}
  //           style={{ width: 200 }}
  //         >
  //           Confirm
  //         </button>
  //       </header>
  //     </section>
  //   );
  // };

  return <>{isConfirmed ? <Success useCase={"confirmAccount"} /> : <Failure message={serverResponse?.message} />}</>;
};

export default ConfirmAccount;
