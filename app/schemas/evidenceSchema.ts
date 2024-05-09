import { z } from 'zod';
import { MEDIUM_OPTIONS } from '../settings';
import creatorSchema from './creatorSchema';

const evidenceSchema = z
  .object({
    nameOfWork: z.string().min(1, { message: 'Name of Work is required' }),
    medium: z.enum([...MEDIUM_OPTIONS], {
      required_error:
        'Medium is required and must be one of: Film, Photo, Music, AI, Art, Other',
    }),
    dateOfCreation: z.date(),
    file: z.custom<File>().nullable(),
    license: z.string(),
  })
  .and(creatorSchema);

export default evidenceSchema;
