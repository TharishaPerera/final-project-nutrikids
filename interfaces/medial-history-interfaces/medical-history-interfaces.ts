export interface MedicalHistoryForParentsInterface {
  additionalNotes: string | null;
  documents: string | null;
  createdAt: Date;
  child: {
    name: string;
  };
}

export interface MedicalHistoryForAdminsInterface {
  additionalNotes: string | null;
  documents: string | null;
  createdAt: Date;
  child: {
    name: string;
    user: {
      name: string | null | undefined;
      email: string | null | undefined;
    };
  };
}
