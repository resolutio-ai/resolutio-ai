import { z } from 'zod';
import { MEDIUM_OPTIONS } from '../settings';

const workDetailsSchema = z.object({
  nameOfWork: z.string().min(1, { message: 'Name of Work is required' }),
  medium: z.enum([...MEDIUM_OPTIONS], {
    required_error:
      'Medium is required and must be one of: Film, Photo, Music, AI, Art, Other',
  }),
  dateOfCreation: z.date().optional(),
  file: z.custom<File>().nullable(),
});

export default workDetailsSchema;
