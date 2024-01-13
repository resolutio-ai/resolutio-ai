export type Creator = {
  id: number;
  name: string;
};

export type EvidenceFromDto = {
  creators: Creator[];
  nameOfWork: string;
  medium: string;
  work: File;
  dateOfCreation: Date;
  license: string;
};
