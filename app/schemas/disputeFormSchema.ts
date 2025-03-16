import { z } from 'zod';

export const disputeFormSchema = z.object({
  oppositePartyName: z
    .string()
    .min(3, { message: 'Please enter the party details' }),
  artId: z.string().min(3, { message: 'Please enter the art ID' }),
  summary: z.string().min(3, { message: 'Please enter the summary' }),
  caseDetails: z.string().min(3, { message: 'Please enter the case details' }),
  type: z.string().min(3, { message: 'Please enter the type' }),
  evidenceAttachments: z.any().nullable()
});
