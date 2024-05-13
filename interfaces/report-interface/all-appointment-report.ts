import { AppointmentStatus } from "@prisma/client";

export interface AllAppointmentReportInterface {
  id: string;
  appointmentDate: Date;
  timeslot: string;
  status: AppointmentStatus;
  pediatrician: {
    specializations: string | null | undefined;
    user: {
      name: string | null | undefined;
      email: string | null | undefined;
    };
  };
  child: {
    name: string;
  };
  parent: {
    name: string | null | undefined;
    email: string | null | undefined;
  };
  additionalNotes?: string | null | undefined;
}

export interface ConsultantAppointmentReportInterface {
  id: string;
  appointmentDate: Date;
  timeslot: string;
  status: AppointmentStatus;
  child: {
    name: string;
  };
  parent: {
    name: string | null | undefined;
    email: string | null | undefined;
  };
  additionalNotes?: string | null | undefined;
}

export interface ParentAppointmentReportInterface {
  id: string;
  appointmentDate: Date;
  timeslot: string;
  status: AppointmentStatus;
  pediatrician: {
    specializations: string | null | undefined;
    user: {
      name: string | null | undefined;
      email: string | null | undefined;
    };
  };
  child: {
    name: string;
  };
  additionalNotes?: string | null | undefined;
}
