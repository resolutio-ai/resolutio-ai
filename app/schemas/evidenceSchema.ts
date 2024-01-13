import { z } from 'zod';

const evidenceSchema = z.object({
  creators: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  medium: z.string(),
  dateOfCreation: z.date(),
  file: z.object({}),
  license: z.string(),
});

export default evidenceSchema;
