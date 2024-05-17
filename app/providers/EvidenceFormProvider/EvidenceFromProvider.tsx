'use client';

import { evidenceSchema } from '@/app/schemas';
import { DEFAULT_LICENSE, DEFAULT_MEDIUM } from '@/app/settings';
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

export type EvidenceFromData = Pick<
  z.infer<typeof evidenceSchema>,
  'creators' | 'nameOfWork' | 'dateOfCreation'
> & {
  file: File[];
  ownLicense: File[];
  medium: string;
  license: string;
};

type PartialEvidenceFromData = Partial<EvidenceFromData>;

type EvidenceFormContext = {
  formData: EvidenceFromData;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  updateForm: (updatedData: PartialEvidenceFromData) => void;
};

const defaultValues: EvidenceFormContext = {
  formData: {
    creators: [{ id: uuidv4(), name: '' }],
    nameOfWork: '',
    medium: DEFAULT_MEDIUM,
    license: DEFAULT_LICENSE,
    dateOfCreation: new Date(),
    file: [],
    ownLicense: [],
  },
  currentStep: 0,
  nextStep: () => {},
  previousStep: () => {},
  updateForm: (updatedData: PartialEvidenceFromData) => {},
};

const EvidenceFormContext = createContext<EvidenceFormContext>(defaultValues);

export const useEvidenceForm = () => {
  return useContext(EvidenceFormContext);
};

export const EvidenceFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState(defaultValues.formData);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const updateForm = (updatedData: PartialEvidenceFromData) => {
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
