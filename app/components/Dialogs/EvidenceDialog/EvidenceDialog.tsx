'use client';

import { FC, useMemo, useState } from 'react';

export const EVIDENCE_MODAL_ID = 'evidence-modal';

const EVIDENCE_STATE = {
  OPEN: 'OPEN',
  ERROR: 'ERROR',
  SUBMITTED: 'SUBMITTED',
} as const;

const EvidenceDialog: FC = () => {
  const [evidenceState, setEvidenceState] = useState<
    keyof typeof EVIDENCE_STATE
  >(EVIDENCE_STATE.OPEN);

  const closeModal = () => {
    const modal = document.getElementById(
      EVIDENCE_MODAL_ID
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const modalContent = useMemo(() => {
    switch (evidenceState) {
      case EVIDENCE_STATE.OPEN:
        return (
          <div>
            <h3 className='text-lg font-bold'>Gas Fees</h3>
            <div>
              <span>0.001 ETH</span>
              <span className='text-gray-500'>0 ETH</span>
              <p className='py-4'>No Gas Fees</p>
            </div>
            <p>{"Focus on your craft, not fees! We've got you covered."}</p>
            <div className='modal-action'></div>
          </div>
        );
      case EVIDENCE_STATE.ERROR:
        return (
          <div>
            <h3 className='text-lg font-bold'>Error</h3>
            <p className='py-4'>
              An error occurred while submitting your evidence
            </p>
            <div className='modal-action'></div>
          </div>
        );
      case EVIDENCE_STATE.SUBMITTED:
        return (
          <div>
            <h3 className='text-lg font-bold'>Submitted</h3>
            <p className='py-4'>Your evidence has been submitted</p>
            <div className='modal-action'></div>
          </div>
        );
      default:
        return null;
    }
  }, [evidenceState]);

  return (
    <dialog
      id={EVIDENCE_MODAL_ID}
      className='modal modal-bottom sm:modal-middle'
    >
      <div className='modal-box'>{modalContent}</div>
    </dialog>
  );
};

export default EvidenceDialog;
