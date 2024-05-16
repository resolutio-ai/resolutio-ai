import { z } from 'zod';
import { LICENSE_OPTIONS } from '../settings';

const licenseSchema = z.object({
  license: z.enum([...LICENSE_OPTIONS], {
    errorMap: () => ({ message: 'Please select a license for your work.' }),
  }),
  ownLicense: z.custom<File>().nullable(),
});

export default licenseSchema;
