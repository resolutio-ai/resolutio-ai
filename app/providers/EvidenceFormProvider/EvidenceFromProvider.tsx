'use client';

import { evidenceSchema } from '@/app/schemas';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export type EvidenceFromData = z.infer<typeof evidenceSchema>;

type EvidenceFormContextType = {
  formData: EvidenceFromData;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  updateForm: (updatedData: Partial<EvidenceFromData>) => void;
};

const defaultValues: EvidenceFormContextType = {
  formData: {
    creators: [{ id: uuidv4(), name: '' }],
    nameOfWork: '',
    medium: 'Art',
    dateOfCreation: new Date(),
    file: null,
    license: '',
  },
  currentStep: 0,
  nextStep: () => {},
  previousStep: () => {},
  updateForm: (updatedData: Partial<EvidenceFromData>) => {},
};

const EvidenceFormContext =
  createContext<EvidenceFormContextType>(defaultValues);

export const useEvidenceForm = () => {
  return useContext(EvidenceFormContext);
};

export const EvidenceFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState<EvidenceFromData>(
    defaultValues.formData
  );
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const updateForm = (updatedData: Partial<EvidenceFromData>) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  const contextValues = useMemo(
    () => ({ formData, currentStep, nextStep, previousStep, updateForm }),
    [currentStep, formData]
  );

  return (
    <EvidenceFormContext.Provider value={contextValues}>
      {children}
    </EvidenceFormContext.Provider>
  );
};

export default EvidenceFormProvider;
