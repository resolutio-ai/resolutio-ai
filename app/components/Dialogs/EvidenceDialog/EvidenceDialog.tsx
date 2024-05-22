'use client';

import { useMintNFT, useUploadToLighthouse } from '@/app/hooks';
import { useEvidenceForm } from '@/app/providers/EvidenceFormProvider/EvidenceFromProvider';
import { ShieldCheckIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { IUploadProgressCallback } from '@lighthouse-web3/sdk/dist/types';
import { createId } from '@paralleldrive/cuid2';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo, useState } from 'react';

export const EVIDENCE_MODAL_ID = 'evidence-modal';

const EVIDENCE_STATE = {
  OPEN: 'OPEN',
  ERROR: 'ERROR',
  SUBMITTED: 'SUBMITTED',
} as const;

const EvidenceDialog: FC = () => {
  const router = useRouter();
  const { formData, resetForm } = useEvidenceForm();
  const { mutate: uploadToLighthouse } = useUploadToLighthouse();
  const { mutate: mint } = useMintNFT();
  const [evidenceState, setEvidenceState] = useState<
    keyof typeof EVIDENCE_STATE
  >(EVIDENCE_STATE.OPEN);
  const [isPending, setIsPending] = useState(false);

  const closeModal = useCallback(() => {
    const modal = document.getElementById(
      EVIDENCE_MODAL_ID
    ) as HTMLDialogElement;
    if (modal) {
      router.push('/');
      modal.close();
      resetForm();
    }
  }, [resetForm, router]);

  const progressCallback = (progressData: IUploadProgressCallback) => {
    if (!progressData) return;
    let percentageDone: number =
      100 - progressData.total / progressData.uploaded;
    console.log(percentageDone);
  };

  const handleEternalizeWork = useCallback(() => {
    const { creators, file, nameOfWork, dateOfCreation, medium } = formData;
    const directory = createId();

    const formValues = {
      creators,
      nameOfWork,
      dateOfCreation,
      medium,
      fileName: file[0].name,
    };

    const filesToUpload = [
      new File(
        [JSON.stringify(formValues, null, 2)],
        `${directory}/work.json`,
        {
          type: 'application/json',
        }
      ),
      new File([file[0]], `${directory}/${file[0].name}`, {
        type: file[0].type,
      }),
    ];
    setIsPending(true);
    uploadToLighthouse(
      {
        files: filesToUpload,
        progressCallback,
      },
      {
        onSuccess: (data) => {
          const {
            data: { Hash: cid },
          } = data;
          //Lighthouse Gateway https://gateway.lighthouse.storage/ipfs/${cid}
          console.log('Uploaded to Lighthouse');
          console.log(`https://gateway.lighthouse.storage/ipfs/${cid}`);
          mint(cid, {
            onSuccess: () => {
              console.log('NFT Minted');
            },
            onError: () => {
              console.log('Error Minting NFT');
              setEvidenceState(EVIDENCE_STATE.ERROR);
            },
            onSettled: () => {
              setIsPending(false);
            },
          });
        },
        onError: () => {
          console.log('Error');
          setEvidenceState(EVIDENCE_STATE.ERROR);
        },
      }
    );
  }, [formData, mint, uploadToLighthouse]);

  const modalContent = useMemo(() => {
    switch (evidenceState) {
      case EVIDENCE_STATE.OPEN:
        return (
          <div>
            <h3 className='text-lg font-bold'>Gas Fees</h3>
            <div className='mt-6 text-center'>
              <span className='mr-2 text-slate-500 line-through'>
                0.001 ETH
              </span>
              <span className='text-xl'>0 ETH</span>
              <p className='text-2xl font-bold'>No Gas Fees</p>
            </div>
            <p className='mt-6 text-center text-xs font-bold text-primary'>
              {"Focus on your craft, not fees! We've got you covered."}
            </p>
            <div className='mt-4 flex justify-center '>
              <button
                className='btn-primary btn w-5/6'
                onClick={handleEternalizeWork}
                disabled={isPending}
              >
                {isPending && <span className='loading loading-spinner'></span>}
                Stamp your work
              </button>
            </div>
          </div>
        );
      case EVIDENCE_STATE.ERROR:
        return (
          <div>
            <div className='flex flex-col justify-center'>
              <XCircleIcon height='56' className=' text-red-500' />
              <h3 className='mt-2 text-center text-lg font-bold'>Error</h3>
            </div>
            <p className='py-4 text-center'>
              An error occurred while submitting your evidence
            </p>
            <div className='mt-4 flex justify-center '>
              <button
                className='btn-primary btn w-5/6'
                onClick={handleEternalizeWork}
                disabled={isPending}
              >
                {isPending && <span className='loading loading-spinner'></span>}
                Try Again
              </button>
            </div>
          </div>
        );
      case EVIDENCE_STATE.SUBMITTED:
        return (
          <div>
            <div className='flex flex-col justify-center'>
              <ShieldCheckIcon height='56' className='text-green-400' />
              <h3 className='my-8 text-center text-lg font-bold'>
                Art Eternalized!
              </h3>
            </div>
            <div className='mt-4 flex justify-center '>
              <button className='btn-primary btn w-5/6' onClick={closeModal}>
                Done
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [closeModal, evidenceState, handleEternalizeWork, isPending]);

  return (
    <dialog id={EVIDENCE_MODAL_ID} className='modal'>
      <div className='modal-box'>{modalContent}</div>
    </dialog>
  );
};

export default EvidenceDialog;
