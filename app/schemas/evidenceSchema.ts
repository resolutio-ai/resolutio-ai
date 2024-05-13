import { z } from 'zod';
import creatorSchema from './creatorSchema';
import licenseSchema from './licenseSchema';
import workDetailsSchema from './workDetailsSchema';

const evidenceSchema = z
  .object({})
  .and(creatorSchema)
  .and(workDetailsSchema)
  .and(licenseSchema);

export default evidenceSchema;
