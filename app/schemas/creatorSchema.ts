import { z } from 'zod';

const creatorSchema = z.object({
  creators: z
    .array(
      z.object({
        id: z.string(),
        name: z
          .string()
          .min(1, { message: 'Please enter the name of the creator' })
      })
    )
    .min(1, { message: 'At least one creator is required' })
});

export default creatorSchema;
