export type Creator = {
  id: string;
  name: string;
};

export type EvidenceFromDto = {
  // metadata(metadata: any): string | Blob;
  creators: Creator[];
  nameOfWork: string;
  medium: string;
  work: File | null;
  dateOfCreation: Date;
  alternativeMedium:string;
  license: string;
};
