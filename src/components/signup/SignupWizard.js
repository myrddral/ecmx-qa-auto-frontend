import * as Yup from "yup";
import { useState } from "react";
import { FormikWizard } from "formik-wizard-form";
import Steps from "./Steps";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import JobDetails from "./JobDetails";

export default function SignupWizard() {
  const [finalValues, setFinalValues] = useState({});
  const [finished, setFinished] = useState(false);
  return (
    <div className="container p-4">
      <FormikWizard
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          addressType: "",
          country: "",
          city: "",
          street: "",
          houseNumber: "",
          postcode: "",
          password: "",
          passwordConf: "",
        }}
        onSubmit={(values) => {
          setFinalValues(values);
          setFinished(true);
        }}
        validateOnNext
        activeStepIndex={0}
        steps={[
          {
            component: PersonalDetails,
            validationSchema: Yup.object().shape({
              firstName: Yup.string().required("firstName name is required"),
              lastName: Yup.string().required("lastName is required"),
              email: Yup.string().email("Please enter valid email").required("Email is required"),
              phone: Yup.string().required("Phone number is required"),
              password: Yup.string().required("Password is required"),
              passwordConf: Yup.string().required("Password is required"),
            }),
          },
          {
            component: ContactDetails,
            validationSchema: Yup.object().shape({
              addressType: Yup.string().required("addressType is required"),
              country: Yup.string().required("country is required"),
              city: Yup.string().required("city is required"),
              street: Yup.string().required("street is required"),
              houseNumber: Yup.string().required("houseNumber is required"),
              postcode: Yup.string().required("postcode is required"),
            }),
          },
          {
            component: JobDetails,
            validationSchema: Yup.object().shape({
              designation: Yup.string().required("Designation is required"),
            }),
          },
        ]}
      >
        {({
          currentStepIndex,
          renderComponent,
          handlePrev,
          handleNext,
          isNextDisabled,
          isPrevDisabled,
          isLastStep,
        }) => {
          return (
            <>
              <Steps currentStepIndex={currentStepIndex} />
              {renderComponent()}
              <div className="buttons">
                <button className="button is-primary" disabled={isPrevDisabled} onClick={handlePrev}>
                  Previous
                </button>
                <button className="button is-primary" disabled={isNextDisabled} onClick={handleNext}>
                  {isLastStep ? "Finish" : "Next"}
                </button>
              </div>
              <div>
                <pre>{JSON.stringify(finalValues, null, 2)}</pre>
              </div>
            </>
          );
        }}
      </FormikWizard>
    </div>
  );
}
