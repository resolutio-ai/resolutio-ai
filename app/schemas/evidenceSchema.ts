import { z } from 'zod';

const evidenceSchema = z.object({
  name: z.string().min(1, { message: 'Name of work is required' }),
  medium: z.string().min(1, { message: 'Medium is required' }),
  dateOfCreation: z
    .string()
    .min(1, { message: 'Date of creation is required' }),
  file: z.string().min(1, { message: 'File is required' }),
  license: z.string().min(1, { message: 'License is required' }),
});

export default evidenceSchema;
