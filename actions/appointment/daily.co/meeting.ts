"use server";

import axios from "axios";

/**
 * Create a meeting on daily.co
 * @returns { url: string }
 */
export const createMeeting = async () => {
  try {
    const response = await axios.post<{ url: string }>(
      "https://api.daily.co/v1/rooms",
      {
        name: "NutrikidsSampleMeeting",
        privacy: "public",
        properties: {
          nbf: "1712912400",
          exp: "1712916000",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DAILY_API_KEY}`,
        },
      }
    );

    const { url }: { url: string } = response.data;
    console.log(url);
    return { url: url };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when creating meeting!" };
  }
};
