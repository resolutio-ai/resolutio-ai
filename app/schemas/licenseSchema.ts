import { z } from 'zod';
import { LICENSE_OPTIONS } from '../settings';

const licenseSchema = z
  .object({
    license: z.enum([...LICENSE_OPTIONS], {
      errorMap: () => ({ message: 'Please select a license for your work.' }),
    }),
    ownLicense: z.any().optional(),
  })
  .refine(
    (data) =>
      data.license !== LICENSE_OPTIONS[6] ||
      (data.license === LICENSE_OPTIONS[6] && data.ownLicense.length >= 1),
    {
      message: 'Please upload your license.',
      path: ['ownLicense'], // Pointing out which field is invalid
    }
  );

export default licenseSchema;

/* .refine((data) => files?.length >= 1, {
    message: 'Please upload your license.',
  })
  .refine((files) => ACCEPTED_LICENSE_TYPES.includes(files?.[0]?.type), {
    message: '.jpg, .jpeg, .png and .webp files are accepted.',
  });  */
