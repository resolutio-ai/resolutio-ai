import { z } from 'zod';
import { MEDIUM_OPTIONS } from '../settings';

const workDetailsSchema = z.object({
  nameOfWork: z
    .string()
    .min(1, { message: 'Please add the name of your work.' }),
  medium: z.enum([...MEDIUM_OPTIONS], {
    errorMap: () => ({ message: 'Please select a medium of your artwork.' }),
  }),
  dateOfCreation: z.date(),
  file: z.any().refine((files) => files?.length >= 1, {
    message: 'Please upload your work.',
  }),
});

export default workDetailsSchema;
