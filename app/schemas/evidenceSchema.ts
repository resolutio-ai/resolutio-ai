import { z } from 'zod';
import { MEDIUM_OPTIONS } from '../settings';

const evidenceSchema = z.object({
  creators: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  nameOfWork: z.string().min(1, { message: 'Name of Work is required' }),
  medium: z.enum([...MEDIUM_OPTIONS], {
    required_error:
      'Medium is required and must be one of: Film, Photo, Music, AI, Art, Other',
  }),
  dateOfCreation: z.date(),
  file: z.custom<File>().nullable(),
  license: z.string(),
});

export default evidenceSchema;
