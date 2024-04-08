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

export interface AllPediatriciansInterface {
  pediatricianId: string
  qualifications?: string | null | undefined
  specializations?: string | null | undefined
  description?: string | null | undefined
  user: {
    name: string | null
    email: string | null
    telephone: string | null | undefined
    image: string | null | undefined
  }
}

interface Availability {
  startTime: string | null
  endTime: string | null
  location: string | null
  dateOfWeek: string | null
  hospital: string | null
}

export interface OnePediatricianDetailsInterface {
  pediatricianId: string
  qualifications?: string | null | undefined
  specializations?: string | null | undefined
  description?: string | null | undefined
  user: {
    name: string | null
    email: string | null
    telephone: string | null | undefined
    image: string | null | undefined
  }
  availability: Availability[] | null | undefined
}