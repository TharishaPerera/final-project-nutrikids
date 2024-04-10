export interface AvailabilityTableInterface {
  id: string;
  name?: string | null;
  email?: string | null;
  telephone?: string | null;
  userRole: {
    role: string | null;
  };
  emailVerified?: Date | null;
}
