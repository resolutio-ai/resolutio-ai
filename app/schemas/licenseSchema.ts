import { z } from 'zod';
import { LICENSE_OPTIONS } from '../settings';

const licenseSchema = z.object({
  license: z.enum([...LICENSE_OPTIONS], {
    required_error: 'Please select a license for your work.',
  }),
});

export default licenseSchema;
