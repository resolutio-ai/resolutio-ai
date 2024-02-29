'use client';

import { evidenceSchema } from '@/app/schemas';
import { Creator, EvidenceFromDto } from '@/app/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CreatorsList from '../formSections/creatorInput';
import CustomDatePicker from '../formSections/dateOfCreation';
import FileUpload from '../formSections/fileUpload';
import FileUploadForLicense from '../formSections/fileUploadforLicence';
import LicenseSelect from '../formSections/licenseSelect';
import Medium from '../formSections/medium';
import WorkNameInput from '../formSections/workNameInpute';
import './Evidenceform.scss';
import { submitEvidenceLocal } from '@/app/adapter/browser/formApiService';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useSignMessage,
  useAccount
} from "wagmi";
import { recoverMessageAddress } from 'viem';
import { IFileUploadedResponse } from '@lighthouse-web3/sdk/dist/types';
import { uploadFile, uploadText, uploadTextEncrypted } from '@/app/integrations/lighthouse/upload';
import kavach from "@lighthouse-web3/kavach";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const defaultValues: EvidenceFromDto = {
  creators: [{ id: 1, name: '' }],
  nameOfWork: '',
  work: null,
  medium: '',
  dateOfCreation: new Date(),
  license: '',
  alternativeMedium: ''
};

const Evidenceform: FC = () => {
  const recoveredAddress = useRef<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, reset } = useForm<EvidenceFromDto>({
    resolver: zodResolver(evidenceSchema),
    defaultValues: defaultValues,
  });

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [evidenceBody, setEvidenceBody] = useState<any | null>(null);
  const [cid, setCID] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<FileList | null>(null);
  const [licenceFile, setLicenceFile] = useState<File | null>(null);
  const [workName, setWorkName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [creators, setCreators] = useState<Creator[]>([{ id: 1, name: '' }]);
  const [selectedLicense, setSelectedLicense] = useState<string>('');
  const [selectedMedium, setSelectedMedium] = useState<string>('');
  const [alternativeMedium, setAlternativeMedium] = useState<string>('');
  const [formSubmissionMessage, setFormSubmissionMessage] =
    useState<string>('');
  const { data: signMessageData, signMessage, variables } = useSignMessage();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x31Ed4D7dF56Fb6F76dA1DF10B6C400de0E5aECaA",
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "_cid",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "createTimestamp",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "createTimestamp",
    args: [
      cid,
      address,
    ],
    enabled: Boolean(cid),
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (!isConnected && openConnectModal) {
    openConnectModal();
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files;

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleMediumSelected = (e: ChangeEvent<HTMLSelectElement>) => setSelectedMedium(e.target.value);

  const handleAlternativeMedium = (e: ChangeEvent<HTMLInputElement>) => setAlternativeMedium(e.target.value);

  const handleWorkName = (event: React.ChangeEvent<HTMLInputElement>) => setWorkName(event.target.value);

  const addCreator = () => {
    const newId = creators.length + 1;
    setCreators([...creators, { id: newId, name: '' }]);
  };

  const handleCreatorName = (id: number, value: string) => {
    setCreators((prevCreators) =>
      prevCreators.map((creator) =>
        creator.id === id ? { ...creator, name: value } : creator
      )
    );
  };

  const handleLicenseChange = (event: ChangeEvent<HTMLSelectElement>) => setSelectedLicense(event.target.value);

  const handleLicenseUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedLicenceFile = e.target.files?.[0];

    if (uploadedLicenceFile) {
      setLicenceFile(uploadedLicenceFile);
    }
  };

  const handleFormSubmit: SubmitHandler<EvidenceFromDto> = async () => {
    try {

      if (!file) {
        throw new Error("Please Attach A file first");
      }     

      const message = await kavach.getAuthMessage(`${address}`);      

      signMessage({ message: message.message as string });
    } catch (error) {
      console.error('Error:', error);
      setFormSubmissionMessage(
        'Form submission unsuccessful .pls try again '
      );
    }
    reset();
  };

  const uploadFiles = async () => {
    if (!file) {
      throw new Error("No file selected.");
    }

    try {
      const fileUploadResponse: IFileUploadedResponse | undefined = (await uploadFile(file))?.data.find(x => x.Name);

      if (!fileUploadResponse) {
        throw new Error("File Upload Failed");
      }     

      let licenseUploadResponse: IFileUploadedResponse | undefined = undefined;

      if (licenceFile) {
        licenseUploadResponse = (await uploadFile(licenceFile))?.data.find(x => x.Name);
      }

      return {
        data: { fileUploadResponse, licenseUploadResponse },
        meshUrl: {
          fileUrl: `https://decrypt.mesh3.network/evm/${fileUploadResponse.Hash}`,
          licenseUrl: licenseUploadResponse ? `https://decrypt.mesh3.network/evm/${licenseUploadResponse.Hash}` : null
        }
      }
    } catch (error) {
      console.error("Error uploading encrypted file:", error)
    }
  }

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const recoverAddress = await recoverMessageAddress({
          message: variables.message,
          signature: signMessageData
        });

        recoveredAddress.current = recoverAddress;

        const metadata = {
          licenseType: selectedLicense,
          alternativeMedium: alternativeMedium,
          medium: selectedMedium,
          dateOfCreation: selectedDate?.toISOString(),
          nameOfWork: workName,
          creatorId: 1,
        };

        const metadataUploadResponse = await uploadText(JSON.stringify(metadata));

        const fileUploadResponse = await uploadFiles();

        const finalTextUpload = await uploadTextEncrypted(JSON.stringify({ metadataUploadResponse, fileUploadResponse }), signMessageData, recoverAddress);

        setCID(finalTextUpload.data.Hash);

        const submitEvidenceBody = { metadata, finalCID: finalTextUpload.data.Hash, fileUploadResponse };

        setEvidenceBody(submitEvidenceBody);

        if (!write) {
          return;
        }
        
        write?.();
      }
    })();
  }, [signMessageData, variables?.message]);

  useEffect(() => {
    (async () => {
      const response = await submitEvidenceLocal(evidenceBody);

      if (response?.status !== 200) {
        throw new Error("Data not saved to backend");
      }

      toast('Form submission was sucessfull');

      formRef.current?.reset();
    })();

  }, [isSuccess])

  return (
    <div className='p-5 lg:p-10'>
      <h3 className='pb-4 text-4xl font-bold tracking-tight text-gray-500'>
        Evidence Form
      </h3>
      <ToastContainer />
      <form
        className='w-[100%] space-y-6 md:w-[328px]'
        onSubmit={handleSubmit(handleFormSubmit)}
        ref={formRef}
      >
        <div className='flex flex-col space-y-4 pb-20'>
          <CreatorsList
            creators={creators}
            onAddCreator={addCreator}
            onNameChange={handleCreatorName}
          />

          <WorkNameInput
            onWorkNameChange={handleWorkName}
            workInput={workName}
          />

          <Medium
            selectedMedium={selectedMedium}
            handleMediumSelected={handleMediumSelected}
            handleAlternativeMedium={handleAlternativeMedium}
            alternativeMedium={alternativeMedium}
          />

          <FileUpload handleFileUpload={handleFileUpload} />
          <CustomDatePicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
          />
          <LicenseSelect
            selectedLicense={selectedLicense}
            handleLicenseChange={handleLicenseChange}
            handleLicenseUpload={handleLicenseUpload}
          />
          <FileUploadForLicense
            handleLicenseUpload={handleLicenseUpload}
            selectedLicense={selectedLicense}
          />
        </div>
        <button className='w-full bg-primary py-4 text-white'>
          Submit
        </button>
        {isSuccess && (
          <div>
            Successfully Submitted your NFT!
            <div>
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </div>
          </div>
        )}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </form>
    </div>
  );
};
export default Evidenceform;
