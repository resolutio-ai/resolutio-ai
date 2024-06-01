'use client';

import { EvidenceDialog } from '@/app/components';
import { evidenceSchema } from '@/app/schemas';
import { DEFAULT_LICENSE, DEFAULT_MEDIUM } from '@/app/settings';
import { createId } from '@paralleldrive/cuid2';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
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
  resetForm: () => void;
};

const defaultValues: EvidenceFormContext = {
  formData: {
    creators: [{ id: createId(), name: '' }],
    nameOfWork: '',
    medium: DEFAULT_MEDIUM,
    license: DEFAULT_LICENSE,
    dateOfCreation: new Date(),
    file: [],
    ownLicense: []
  },
  currentStep: 1,
  nextStep: () => {},
  previousStep: () => {},
  updateForm: (updatedData: PartialEvidenceFromData) => {},
  resetForm: () => {}
};

const EvidenceFormContext = createContext<EvidenceFormContext>(defaultValues);

export const useEvidenceForm = () => {
  return useContext(EvidenceFormContext);
};

export const EvidenceFormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState(defaultValues.formData);
  const [currentStep, setCurrentStep] = useState<number>(
    defaultValues.currentStep
  );

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const previousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const updateForm = (updatedData: PartialEvidenceFromData) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  const resetForm = () => {
    setFormData(defaultValues.formData);
    setCurrentStep(1);
  };

  const contextValues = useMemo(
    () => ({
      formData,
      currentStep,
      nextStep,
      previousStep,
      updateForm,
      resetForm
    }),
    [currentStep, formData]
  );

  return (
    <EvidenceFormContext.Provider value={contextValues}>
      <EvidenceDialog />
      {children}
    </EvidenceFormContext.Provider>
  );
};

export default EvidenceFormProvider;
