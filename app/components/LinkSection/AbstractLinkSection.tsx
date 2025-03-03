import { DecorationIcon } from '@/app/assets';
import { getLinkSection } from '@/app/services';
import SmartLink from '../SmartLink/SmartLink';

type LinkSection = {
  heading: string;
  description: string;
  btnText: string;
  link: string;
  isExternal: boolean;
};

type AbstractLinkSectionProps = {
  sectionFile: string;
};

export const AbstractLinkSection = async ({
  sectionFile
}: AbstractLinkSectionProps) => {
  let linkSection: LinkSection | null = null;

  const response: Response = await getLinkSection(sectionFile);
  linkSection = await response.json();

  // If section is null, return null
  if (!linkSection) return null;

  const { heading, description, btnText, link, isExternal } = linkSection;

  return (
    <div className='bg-[#f4f4f4] py-16'>
      <div className='res-container'>
        <h1 className='font-primary-heading mb-4'>{heading}</h1>
        <p>{description}</p>
        <div className='relative mt-14'>
          <SmartLink
            isExternal={isExternal}
            href={link}
            className='btn-secondary btn w-48'
          >
            {btnText}
          </SmartLink>
          <DecorationIcon />
        </div>
      </div>
    </div>
  );
};
