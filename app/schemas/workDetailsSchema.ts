import { z } from 'zod';
import { MEDIUM_OPTIONS } from '../settings';
import { ACCEPTED_WORK_TYPES } from '../settings/data.config';

const workDetailsSchema = z.object({
  nameOfWork: z
    .string()
    .min(1, { message: 'Please add the name of your work.' }),
  medium: z.enum([...MEDIUM_OPTIONS], {
    errorMap: () => ({ message: 'Please select a medium of your artwork.' }),
  }),
  dateOfCreation: z.date(),
  file: z
    .any()
    .refine((files) => files?.length >= 1, {
      message: 'Please upload your work.',
    })
    .refine((files) => ACCEPTED_WORK_TYPES.includes(files?.[0]?.type), {
      message: '.jpg, .jpeg, .png and .webp files are accepted.',
    }),
});

export default workDetailsSchema;
