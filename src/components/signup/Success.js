const Success = ({useCase}) => {
  return (
    <>
      <section className="section">
        <header className="has-text-centered has-text-weight-medium is-size-4 is-flex is-flex-direction-column">
          <img className="is-align-self-center mb-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Check_green_circle.svg/512px-Check_green_circle.svg.png?20180916185340"
            alt="tick"
            width={200}
          />
          {useCase === "registration" && <p className="mt-4">Succesful registration, please check your inbox to confirm your account.</p>}
          {useCase === "confirmAccount" && <p className="mt-4">Account successfully confirmed.</p>}
        </header>
      </section>
    </>
  );
};

export default Success;
