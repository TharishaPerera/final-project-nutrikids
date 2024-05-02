"use server";

import { MeetingInterface, MeetingResponseInterface } from "@/interfaces/appointment-interfaces/appointment-interfaces";
import axios from "axios";
import { z } from "zod";
import { cancelAppointment } from "../appointment";

/**
 * Create a meeting on daily.co
 * @returns { url: string }
 */
export const createMeeting = async (data: MeetingInterface) => {
  try {
    const response = await axios.post<MeetingResponseInterface>(
      `${process.env.DAILY_API_URL}/rooms`,
      {
        name: data.name,
        privacy: data.privacy ?? 'public',
        properties: {
          nbf: data.startTime,
          exp: data.endTime,
          enable_hand_raising: true,
          enable_prejoin_ui: true,
          enable_noise_cancellation_ui: true,
          enable_screenshare: true,
          enable_chat: true,
          eject_at_room_exp: true,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DAILY_API_KEY}`,
        },
      }
    );

    const meetingData: MeetingResponseInterface = response.data;
    return { meetingData };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when creating meeting!" };
  }
};

/**
 * Delete daily.co meeting
 * @param name string
 * @returns string
 */
export const deleteMeeting = async (name: string, appointmentId: string) => {
  try {
    await axios.delete(`${process.env.DAILY_API_URL}/rooms/${name}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DAILY_API_KEY}`,
      },
    });

    const response = await cancelAppointment(appointmentId)

    return { success: "Meeting deleted successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when deleting meeting!" };
  }
}