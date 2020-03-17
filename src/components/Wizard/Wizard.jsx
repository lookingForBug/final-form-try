import React, { useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FORM_VALUES = {
  step_one: {
    inn: {
      type: "text",
      label: "ИНН",
      value: ""
    },
    phone: {
      type: "text",
      label: "Телефон",
      value: ""
    }
  },
  step_two: {
    sms: {
      type: "text",
      label: "Смс",
      value: ""
    }
  }
};

export const Wizard = ({ formValues = FORM_VALUES }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsCount = Object.keys(formValues).length || 0;

  const nextStep = () =>
    setActiveStep(Math.min(activeStep + 1, stepsCount - 1));
  const prevStep = () => setActiveStep(Math.max(activeStep - 1, 0));

  return (
    <FinalForm onSubmit={onSubmit} initialValues={FORM_VALUES}>
      {({ handleSubmit, values }) => {
        const steps = Object.keys(values);

        return (
          <form onSubmit={handleSubmit}>
            <Field name={steps[activeStep]}>
              {({ input }) => {
                const stepFieldNames = Object.keys(input.value);

                return (
                  <div>
                    {stepFieldNames.map(fieldName => (
                      <Field name={`${steps[activeStep]}.${fieldName}`}>
                        {({ input }) => {
                          return (
                            <div>
                              <label>
                                {input.value.label}
                                <input
                                  type={input.value.type}
                                  onChange={e =>
                                    input.onChange({
                                      ...input.value,
                                      value: e.target.value
                                    })
                                  }
                                  value={input.value.value}
                                />
                              </label>
                            </div>
                          );
                        }}
                      </Field>
                    ))}
                    <div>
                      <button onClick={nextStep}>Next</button>
                      <button onClick={prevStep}>Prev</button>
                    </div>
                  </div>
                );
              }}
            </Field>
          </form>
        );
      }}
    </FinalForm>
  );
};
