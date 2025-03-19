'use client';

import { disputeFormSchema } from '@/app/schemas/disputeFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorMsg } from '../error-msg/ErrorMsg';
import FileUpload from '../Evidence/FileUpload/FileUpload';

type DisputeData = z.infer<typeof disputeFormSchema>;

export const DisputeResolutionForm = () => {
  const methods = useForm<DisputeData>({
    resolver: zodResolver(disputeFormSchema)
  });

  const { handleSubmit, register } = methods;

  const onSubmit = (data: DisputeData) => {
    console.log(data);
  };

  return (
    <div className='card xs:w-100 bg-white p-10 shadow-sm md:w-2xl'>
      <h3 className='pb-4 text-center text-4xl font-bold tracking-tight text-gray-500'>
        Initiate Dispute
      </h3>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4'>
              <label
                className='text-sm font-bold text-gray-600'
                htmlFor='oppositePartyName'
              >
                Opposite Party/ Parties
              </label>
              <input
                type='text'
                className='input input-primary mt-2 w-full'
                placeholder="Party/parties against whom you're imitating this dispute"
                id='oppositePartyName'
                {...register('oppositePartyName')}
              />
              <ErrorMsg name='oppositePartyName' />
            </div>
            <div className='mt-1'>
              <label
                className='text-sm font-bold text-gray-600'
                htmlFor='artId'
              >
                Art Id
              </label>
              <input
                type='text'
                className='input input-primary mt-2 w-full'
                placeholder='If the art is already recorded on creator armour'
                id='artId'
                {...register('artId')}
              />
              <ErrorMsg name={'artId'} />
            </div>
            <div className='mt-1'>
              <label
                className='text-sm font-bold text-gray-600'
                htmlFor='summary'
              >
                Summary
              </label>
              <textarea
                id='summary'
                rows={10}
                className='input input-primary mt-2 min-h-[100px] w-full py-2'
                placeholder='Briefly describe the dispute(250 Charatrers).'
                {...register('summary')}
              />
              <ErrorMsg name={'summary'} />
            </div>
            <div className='mt-1'>
              <label
                className='text-sm font-bold text-gray-600'
                htmlFor='caseDetails'
              >
                Case Details
              </label>
              <input
                type='text'
                className='input input-primary mt-2 w-full'
                placeholder='Case Details'
                id='caseDetails'
                {...register('caseDetails')}
              />
              <ErrorMsg name={'caseDetails'} />
            </div>
            <div className='mt-1'>
              <label className='text-sm font-bold text-gray-600' htmlFor='type'>
                Type
              </label>
              <input
                type='text'
                className='input input-primary mt-2 w-full'
                placeholder='Dispute Type(Drawing, Design, Music, Illustration, Video, Code, Film, Literature)'
                id='type'
                {...register('type')}
              />
              <ErrorMsg name={'type'} />
            </div>
            <div className='mt-1'>
              <FileUpload
                name='evidenceAttachments'
                label='Attach your evidence'
              />
              <ErrorMsg name='evidenceAttachments' />
            </div>
            <button type='submit' className='btn btn-primary mt-4 w-full'>
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
