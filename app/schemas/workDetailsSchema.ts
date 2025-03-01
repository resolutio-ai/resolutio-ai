import { z } from 'zod';
import {
  ACCEPTED_WORK_TYPES,
  DEFAULT_MEDIUM,
  MEDIUM_OPTIONS
} from '../settings/data.config';

const workDetailsSchema = z.object({
  nameOfWork: z
    .string()
    .min(1, { message: 'Please add the name of your work.' }),
  medium: z
    .string()
    .refine((value) => value !== DEFAULT_MEDIUM, {
      message: 'Please select a medium of your artwork.'
    })
    .pipe(z.enum([...MEDIUM_OPTIONS] as [string, ...string[]])),
  dateOfCreation: z.date(),
  file: z
    .custom<File[]>(
      (files) => files instanceof Array && files.every((f) => f instanceof File)
    )
    .refine((files: File[]) => files?.length >= 1, {
      message: 'Please upload your work.'
    })
    .refine((files: File[]) => ACCEPTED_WORK_TYPES.includes(files?.[0]?.type), {
      message: '.jpg, .jpeg, .png and .webp files are accepted.'
    })
});

export default workDetailsSchema;
