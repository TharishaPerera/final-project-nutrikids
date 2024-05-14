export interface MedicalHistoryForParentsInterface {
  additionalNotes: string | null;
  documents: string | null;
  createdAt: Date;
  child: {
    name: string;
  };
}
