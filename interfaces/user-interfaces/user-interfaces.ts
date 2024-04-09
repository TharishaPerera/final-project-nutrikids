export interface UserTableInterface {
  id: string;
  name?: string | null;
  email?: string | null;
  telephone?: string | null;
  userRole: {
    role: string | null;
  };
  emailVerified?: Date | null;
}

export interface PediatricianDetailsInterface {
  pediatricianId: string;
  userId: string;
  qualifications?: string | null | undefined;
  specializations?: string | null | undefined;
  description?: string | null | undefined;
}

export interface AllPediatriciansInterface {
  pediatricianId: string;
  qualifications?: string | null | undefined;
  specializations?: string | null | undefined;
  description?: string | null | undefined;
  user: {
    name: string | null;
    email: string | null;
    telephone: string | null | undefined;
    image: string | null | undefined;
  };
}

interface Availability {
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  dateOfWeek: string | null;
  hospital: string | null;
}

export interface OnePediatricianDetailsInterface {
  pediatricianId: string;
  qualifications?: string | null | undefined;
  specializations?: string | null | undefined;
  description?: string | null | undefined;
  user: {
    name: string | null;
    email: string | null;
    telephone: string | null | undefined;
    image: string | null | undefined;
  };
  availability: Availability[] | null | undefined;
}

interface Pediatrician {
  pediatricianId: string;
  userId: string;
  qualifications: string | null;
  specializations: string | null;
  description: string | null;
}
export interface UserProfileInterface {
  id?: string;
  name: string | null;
  image: string | null;
  email: string | null;
  telephone: string | null;
  isPediatrician: Pediatrician | null;
  isOAuth?: boolean;
  isTwoFactorEnabled?: boolean;
}
