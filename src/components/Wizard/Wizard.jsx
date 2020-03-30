import React, { useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import FORM_VALUES from './data.json';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(700);
  window.alert(JSON.stringify(values, 0, 2));
};

const WizardStep = ({ stepEntry }) => (
  <Field name={stepEntry}>
    {({ input }) => {
      const stepFieldNames = Object.keys(input.value);

      return (
        <React.Fragment>
          {stepFieldNames.map((fieldName, i) => (
            <Field key={i} name={`${stepEntry}.${fieldName}`}>
              {({ input }) => {
                const { label, type, value } = input.value;
                return (
                  <div>
                    <label>
                      {label}
                      <input
                        type={type}
                        onChange={e =>
                          input.onChange({
                            ...input.value,
                            value: e.target.value
                          })
                        }
                        value={value}
                      />
                    </label>
                  </div>
                );
              }}
            </Field>
          ))}
        </React.Fragment>
      );
    }}
  </Field>
);

export const Wizard = ({ formValues = FORM_VALUES }) => {
  const [activeStep, setActiveStep] = useState(0);
  const adjustStepsCount = Object.keys(formValues).length - 1 || 0;

  const nextStep = () =>
    setActiveStep(Math.min(activeStep + 1, adjustStepsCount));
  const prevStep = () => setActiveStep(Math.max(activeStep - 1, 0));

  return (
    <FinalForm onSubmit={onSubmit} initialValues={FORM_VALUES}>
      {({ handleSubmit, values }) => {
        const stepEntry = Object.keys(values)[activeStep];

        return (
          <form className="form" onSubmit={handleSubmit}>
            <WizardStep stepEntry={stepEntry} />
            <div className="btn-wrapper">
              {activeStep > 0 && <button className="btn" type="button" onClick={prevStep}>Prev</button>}
              {activeStep < adjustStepsCount && <button className="btn" type="button" onClick={nextStep}>Next</button>}
              {activeStep === adjustStepsCount && <button className="btn">Submit Form</button>}
            </div>
          </form>
        );
      }}
    </FinalForm>
  );
};
