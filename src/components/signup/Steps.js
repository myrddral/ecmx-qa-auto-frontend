import cx from "classnames";

const stepsList = ["Personal Details", "Address Details"];

const Steps = ({ currentStepIndex }) => {
  return (
    <div className="steps is-flex is-justify-content-space-evenly">
      {stepsList.map((step, idx) => (
        <div
          key={step}
          className={cx(
            "step-item",
            "is-success",
            currentStepIndex > idx && "is-completed",
            idx === currentStepIndex && "is-active"
          )}
        >
          <div className="step-marker">
            <span className="icon">
              <i className="fa fa-user"></i>
            </span>
          </div>
          <div className="step-details">
            <p className="step-title">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;
