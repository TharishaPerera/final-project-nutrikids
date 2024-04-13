
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
