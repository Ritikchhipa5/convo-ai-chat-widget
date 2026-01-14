"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type InitialValuesProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const InitialValues: InitialValuesProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const RegisterContext = createContext(InitialValues);

export const RegisterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    InitialValues.currentStep
  );

  const values = { currentStep, setCurrentStep };
  return (
    <RegisterContext.Provider value={values}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterAuthContextHook = () => {
  const state = useContext(RegisterContext);
  return state;
};
