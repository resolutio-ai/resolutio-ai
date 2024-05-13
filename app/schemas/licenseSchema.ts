import { z } from 'zod';

const licenseSchema = z.object({
  license: z.string(),
});

export default licenseSchema;
