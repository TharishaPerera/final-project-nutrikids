export interface UserTableInterface {
  id: string;
  name?: string | null;
  email?: string | null;
  telephone?: string | null;
  userRole: {
    role: string | null;
  }
  emailVerified?: Date | null;
}

export interface PediatricianDetailsInterface {
  pediatricianId: string
  userId: string
  qualifications?: string | null | undefined
  specializations?: string | null | undefined
  description?: string | null | undefined
}