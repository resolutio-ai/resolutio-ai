export type Creator = {
  id: string;
  name: string;
};

export type EvidenceFromDto = {
  creators: Creator[];
  nameOfWork: string;
  medium: string;
  work: File | null;
  dateOfCreation: Date;
  license: string;
};
