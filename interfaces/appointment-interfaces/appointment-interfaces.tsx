import { AppointmentStatus, MeetingStatus } from "@prisma/client";

// Create meeting interface
export interface MeetingInterface {
  name: string;
  privacy?: "public" | "private";
  startTime: string;
  endTime: string;
}

// Create meeting response interface
export interface MeetingResponseInterface {
  id: string;
  name: string;
  api_created: boolean;
  privacy: "public" | "private";
  url: string;
  created_at: string;
  config: {
      nbf: number;
      exp: number;
      enable_chat: boolean;
      enable_hand_raising: boolean;
      eject_at_room_exp: boolean;
      enable_prejoin_ui: boolean;
      enable_noise_cancellation_ui: boolean;
  };
}

export interface MyAppointmentsInterface {
  id: string;
  additionalNotes?: string | null;
  appointmentDate: Date;
  timeslot: string;
  status: string;
  pediatrician: {
    pediatricianId: string;
    user: {
      name?: string | null;
      email?: string | null;
    }
    specializations?: string | null;
  };
  child?: {
    name: string;
  };
  meeting: {
    id: string;
    name: string;
    url: string;
    status: string;
  };
}
