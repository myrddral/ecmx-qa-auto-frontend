import { getApiUrl } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const handleClick = async () => {
    // api call to confirm account
    const response = await fetch(`${getApiUrl()}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uid),
    });

    const received = await response.json();
    console.log(received);
  };

  return (
    <>
      <section className="section">
        <header className="has-text-centered has-text-weight-medium is-size-4 is-flex is-flex-direction-column">
          <p className="mb-4">Please confirm your account by clicking on the button below</p>
          <button
            className="m-4 button is-primary-darker is-align-self-center"
            onClick={handleClick}
            style={{ width: 200 }}
          >
            Confirm
          </button>
        </header>
      </section>
    </>
  );
};

export default PasswordReset;