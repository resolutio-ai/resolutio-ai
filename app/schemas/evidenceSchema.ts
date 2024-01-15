import { z } from 'zod';

const evidenceSchema = z.object({
  creators: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  nameOfWork: z.string(),
  medium: z.string(),
  dateOfCreation: z.date(),
  file: z.custom<File>().nullable(),
  license: z.string(),
});

export default evidenceSchema;
